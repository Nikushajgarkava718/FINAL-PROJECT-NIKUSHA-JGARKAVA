const burger = document.querySelector("#burger");
const mainNav = document.querySelector("#main-nav");

burger.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  burger.classList.toggle("open", isOpen);
  burger.setAttribute("aria-expanded", isOpen);
});

mainNav.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

const slides = document.querySelectorAll("#hero-slider .slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

if (slides.length > 0) {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

/* ===================================================
   About Me — progress bar-ების ანიმაცია სქროლზე
=================================================== */
const skillsSection = document.querySelector("#skills");
const progressFills = document.querySelectorAll(".progress-fill");
let skillsAnimated = false;

function animateSkills() {
  progressFills.forEach((fill) => {
    const percent = fill.dataset.percent || 0;
    fill.style.width = percent + "%";
  });
}

if (skillsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !skillsAnimated) {
          animateSkills();
          skillsAnimated = true;
          observer.unobserve(skillsSection);
        }
      });
    },
    { threshold: 0.4 },
  );

  observer.observe(skillsSection);
}
