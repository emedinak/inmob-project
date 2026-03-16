// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {
  
      const target = document.querySelector(this.getAttribute("href"));
  
      if(target){
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
  
    });
  
  });
  
  
  // ===============================
  // NAVBAR SCROLL EFFECT
  // ===============================
  
  const navbar = document.getElementById("navbar");
  
  if(navbar){
  
    window.addEventListener("scroll", () => {
  
      if(window.scrollY > 40){
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
  
    });
  
  }
  
  
  // ===============================
  // HERO SLIDER
  // ===============================
  
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  
  let index = 0;
  
  if(slides.length > 0){
  
    slides.forEach((_,i)=>{
  
      const dot = document.createElement("span");
  
      if(i === 0){
        dot.classList.add("active");
      }
  
      dot.addEventListener("click",()=>{
        index = i;
        showSlide();
      });
  
      dotsContainer.appendChild(dot);
  
    });
  
  }
  
  const dots = document.querySelectorAll(".slider-dots span");
  
  function showSlide(){
  
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
  
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  
  }
  
  function nextSlide(){
  
    index++;
  
    if(index >= slides.length){
      index = 0;
    }
  
    showSlide();
  
  }
  
  function prevSlide(){
  
    index--;
  
    if(index < 0){
      index = slides.length - 1;
    }
  
    showSlide();
  
  }
  
  if(nextBtn && prevBtn){
  
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
  
    setInterval(nextSlide,6000);
  
  }
  
  
  // ===============================
  // LIGHTBOX GLOBAL
  // ===============================
  
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-lightbox");
  
  if(closeBtn){
  
    closeBtn.addEventListener("click",()=>{
      lightbox.style.display="none";
    });
  
  }
  
  if(lightbox){
  
    lightbox.addEventListener("click",(e)=>{
  
      if(e.target !== lightboxImg){
        lightbox.style.display="none";
      }
  
    });
  
  }
  
  
  // ===============================
  // CONTACT FORM
  // ===============================
  
  const form = document.getElementById("contact-form");
  const message = document.getElementById("form-message");
  
  if(form){
  
    form.addEventListener("submit", async function(e){
  
      e.preventDefault();
  
      const data = new FormData(form);
  
      const response = await fetch(form.action,{
        method:"POST",
        body:data,
        headers:{ 'Accept':'application/json' }
      });
  
      if(response.ok){

        message.style.display="block";
        message.style.color="green";
        message.textContent="Mensaje enviado. Nos pondremos en contacto pronto.";
        
        form.reset();
        
        message.scrollIntoView({behavior:"smooth"});
        
        }
    
      else {
  
        message.style.display="block";
        message.style.color="red";
        message.textContent="Hubo un error. Intenta nuevamente.";
  
      }
  
    });
  
  }
  
  
  // ===============================
  // COVERFLOW GALLERY
  // ===============================
  
  document.addEventListener("DOMContentLoaded",()=>{
  
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
  
  const leftImg = document.querySelector(".cover-img.left");
  const centerImg = document.querySelector(".cover-img.center");
  const rightImg = document.querySelector(".cover-img.right");
  
  const nextBtnGallery = document.querySelector(".cover-btn.next");
  const prevBtnGallery = document.querySelector(".cover-btn.prev");
  
  const coverflow = document.querySelector(".coverflow");
  
  function updateGallery(){
  
  const left = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
  const center = galleryIndex;
  const right = (galleryIndex + 1) % galleryImages.length;
  
  leftImg.src = galleryImages[left];
  centerImg.src = galleryImages[center];
  rightImg.src = galleryImages[right];
  
  }
  
  
  // arrows
  
  if(nextBtnGallery){
  
  nextBtnGallery.addEventListener("click",()=>{
  
  galleryIndex++;
  
  if(galleryIndex >= galleryImages.length){
  galleryIndex = 0;
  }
  
  updateGallery();
  
  });
  
  }
  
  if(prevBtnGallery){
  
  prevBtnGallery.addEventListener("click",()=>{
  
  galleryIndex--;
  
  if(galleryIndex < 0){
  galleryIndex = galleryImages.length-1;
  }
  
  updateGallery();
  
  });
  
  }
  
  
  // autoplay
  
  setInterval(()=>{
  
  galleryIndex++;
  
  if(galleryIndex >= galleryImages.length){
  galleryIndex=0;
  }
  
  updateGallery();
  
  },5000);
  
  
  // swipe mobile
  
  let startX=0;
  
  if(coverflow){
  
  coverflow.addEventListener("touchstart",(e)=>{
  startX=e.touches[0].clientX;
  });
  
  coverflow.addEventListener("touchend",(e)=>{
  
  let endX=e.changedTouches[0].clientX;
  
  if(startX-endX>50){
  galleryIndex++;
  }
  
  if(endX-startX>50){
  galleryIndex--;
  }
  
  if(galleryIndex>=galleryImages.length){
  galleryIndex=0;
  }
  
  if(galleryIndex<0){
  galleryIndex=galleryImages.length-1;
  }
  
  updateGallery();
  
  });
  
  }
  
  
  // click imagen central → lightbox
  
  if(centerImg){
  
  centerImg.addEventListener("click",()=>{
  
  lightbox.style.display="flex";
  lightboxImg.src=centerImg.src;
  
  });
  
  }
  
  
  // INIT
  
  updateGallery();
  
  });

  // MASTERPLAN LIGHTBOX

const masterplan = document.querySelector(".masterplan-click");

if(masterplan){

masterplan.addEventListener("click",()=>{

lightbox.style.display="flex";
lightboxImg.src = masterplan.src;

});

}

// ABRIR MASTERPLAN DESDE BADGE

const masterplanButton = document.querySelector(".masterplan-open");

if(masterplanButton){

masterplanButton.addEventListener("click",()=>{

lightbox.style.display="flex";
lightboxImg.src="images/masterplan.jpg";

});

}