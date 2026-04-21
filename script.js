// ===============================
// PAGE LOAD ENTRANCE
// ===============================

window.addEventListener("load", () => {
  // Remove any page-enter overlay
  const overlay = document.querySelector(".page-enter");
  if(overlay) overlay.remove();
});


// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if(target){
      e.preventDefault();
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.getElementById("navbar");

if(navbar){
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });
}


// ===============================
// HAMBURGER MENU
// ===============================

const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

if(hamburger && navLinks){
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
    }
  });
}


// ===============================
// LIGHTBOX (with animation)
// ===============================

const lightbox    = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn    = document.querySelector(".close-lightbox");

function openLightbox(src){
  lightboxImg.src = src;
  lightbox.style.display = "flex";
  // Force reflow then add open class
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      lightbox.classList.add("open");
    });
  });
  document.body.style.overflow = "hidden";
}

function closeLightbox(){
  lightbox.classList.remove("open");
  setTimeout(() => {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }, 350);
}

if(closeBtn) closeBtn.addEventListener("click", closeLightbox);

if(lightbox){
  lightbox.addEventListener("click", (e) => {
    if(e.target !== lightboxImg) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if(e.key === "Escape") closeLightbox();
});


// ===============================
// CONTACT FORM
// ===============================

const form       = document.getElementById("contact-form");
const message    = document.getElementById("form-message");
const formSubmit = document.getElementById("form-submit");

if(form){
  form.addEventListener("submit", async function(e){
    e.preventDefault();

    formSubmit.disabled    = true;
    formSubmit.textContent = "Enviando...";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if(response.ok){
        message.style.display  = "block";
        message.style.color    = "green";
        message.textContent    = "Mensaje enviado. Nos pondremos en contacto pronto.";
        form.reset();
        message.scrollIntoView({ behavior: "smooth" });
      } else {
        throw new Error("error");
      }
    } catch {
      message.style.display = "block";
      message.style.color   = "red";
      message.textContent   = "Hubo un error. Intenta nuevamente.";
    } finally {
      formSubmit.disabled    = false;
      formSubmit.textContent = "Enviar";
    }
  });
}


// ===============================
// COVERFLOW GALLERY
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const galleryImages = [
    "images/CCAY001.jpg.jpeg",
    "images/CCAY002.jpg.jpeg",
    "images/CCAY003.jpg.jpeg",
    "images/CCAY004.jpg.jpeg",
    "images/CCAY005.jpg.jpeg",
    "images/CCAY006.jpg.jpeg",
    "images/CCAY007.jpg.jpeg",
    "images/CCAY008.jpg.jpeg",
    "images/CCAY009.jpg.jpeg"
  ];

  let galleryIndex = 0;
  let galleryTimer = null;

  const leftImg        = document.querySelector(".cover-img.left");
  const centerImg      = document.querySelector(".cover-img.center");
  const rightImg       = document.querySelector(".cover-img.right");
  const nextBtnGallery = document.querySelector(".cover-btn.next");
  const prevBtnGallery = document.querySelector(".cover-btn.prev");
  const coverflow      = document.querySelector(".coverflow");

  function updateGallery(){
    const n = galleryImages.length;
    if(leftImg)   leftImg.src   = galleryImages[(galleryIndex - 1 + n) % n];
    if(centerImg) centerImg.src = galleryImages[galleryIndex];
    if(rightImg)  rightImg.src  = galleryImages[(galleryIndex + 1) % n];
  }

  function galleryNext(){
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateGallery();
  }

  function galleryPrev(){
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
  }

  function resetGalleryTimer(){
    clearInterval(galleryTimer);
    galleryTimer = setInterval(galleryNext, 5000);
  }

  if(nextBtnGallery) nextBtnGallery.addEventListener("click", () => { galleryNext(); resetGalleryTimer(); });
  if(prevBtnGallery) prevBtnGallery.addEventListener("click", () => { galleryPrev(); resetGalleryTimer(); });

  let startX = 0;
  if(coverflow){
    coverflow.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
    coverflow.addEventListener("touchend",   (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if(Math.abs(diff) > 50){
        diff > 0 ? galleryNext() : galleryPrev();
        resetGalleryTimer();
      }
    });
  }

  if(centerImg){
    centerImg.addEventListener("click", () => openLightbox(centerImg.src));
  }

  if(leftImg) {
    updateGallery();
    resetGalleryTimer();
  }

});


// ===============================
// MASTERPLAN LIGHTBOX
// ===============================

const masterplan = document.querySelector(".masterplan-click");
if(masterplan){
  masterplan.addEventListener("click", () => openLightbox(masterplan.src));
}

const masterplanButton = document.querySelector(".masterplan-open");
if(masterplanButton){
  masterplanButton.addEventListener("click", () => openLightbox("images/masterplan.jpg"));
}


// ===============================
// AMENITIES — CAROUSEL
// ===============================

(function () {
  const track   = document.getElementById("amTrack");
  const prevBtn = document.getElementById("amPrev");
  const nextBtn = document.getElementById("amNext");
  if (!track) return;

  const cards = Array.from(track.querySelectorAll(".am-card"));
  const total = cards.length;
  let current = 0;

  function showGroup(centerIdx) {
    const c    = (centerIdx + total) % total;
    const prev = (c - 1 + total) % total;
    const next = (c + 1) % total;
  
    const isMobile = window.innerWidth <= 768;
  
    cards.forEach((card, i) => {
      const inGroup = isMobile
        ? i === c
        : i === prev || i === c || i === next;
      card.style.display = inGroup ? "" : "none";
      card.classList.toggle("active", i === c);
    });
  }

  if(prevBtn) prevBtn.addEventListener("click", () => {
    current = (current - 3 + total) % total;
    showGroup(current);
  });

  if(nextBtn) nextBtn.addEventListener("click", () => {
    current = (current + 3) % total;
    showGroup(current);
  });

  track.addEventListener("click", e => {
    const trigger = e.target.closest(".am-lightbox-trigger");
    if (!trigger) return;
    const img = trigger.querySelector("img");
    if (img) openLightbox(img.src);
  });

  let touchStart = 0;
  track.addEventListener("touchstart", e => { touchStart = e.touches[0].clientX; });
  track.addEventListener("touchend",   e => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      current = diff > 0
        ? (current + 3) % total
        : (current - 3 + total) % total;
      showGroup(current);
    }
  });

  showGroup(0);

})();


// ===============================
// SCROLL REVEAL
// ===============================

(function(){
  const elements = document.querySelectorAll("[data-reveal]");

  if(!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  });

  elements.forEach(el => observer.observe(el));
})();


// ===============================
// HERO PARALLAX
// ===============================

(function(){
  const heroVideo = document.querySelector(".hero-video");
  if(!heroVideo) return;

  let ticking = false;

  window.addEventListener("scroll", () => {
    if(!ticking){
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if(scrollY < window.innerHeight){
          heroVideo.style.transform = `translateY(${scrollY * 0.35}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();


// ===============================
// CURSOR GLOW (desktop only)
// ===============================

(function(){
  if(window.innerWidth < 768) return;
  if(!window.matchMedia("(hover:hover)").matches) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow(){
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + "px";
    glow.style.top  = glowY + "px";
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
})();





// ===============================
// STAT CARDS COUNTER ANIMATION
// ===============================

(function(){
  // Only animate numeric stat numbers
  const statNumbers = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;

      const el = entry.target;
      const text = el.textContent.trim();
      const num = parseFloat(text.replace(/[^0-9.]/g, ""));

      // Only animate if it contains a number
      if(!isNaN(num) && num > 0){
        const prefix = text.match(/^[^0-9]*/)?.[0] || "";
        const suffix = text.match(/[^0-9.]+$/)?.[0] || "";
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();

        function update(now){
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * num);
          el.textContent = prefix + current + suffix;
          if(progress < 1) requestAnimationFrame(update);
          else el.textContent = text; // restore exact original
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
})();