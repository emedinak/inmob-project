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
// LIGHTBOX
// ===============================

const lightbox    = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn    = document.querySelector(".close-lightbox");

function openLightbox(src){
  lightboxImg.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox(){
  lightbox.style.display = "none";
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
    leftImg.src   = galleryImages[(galleryIndex - 1 + n) % n];
    centerImg.src = galleryImages[galleryIndex];
    rightImg.src  = galleryImages[(galleryIndex + 1) % n];
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

  updateGallery();
  resetGalleryTimer();

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

    cards.forEach((card, i) => {
      const inGroup = i === prev || i === c || i === next;
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