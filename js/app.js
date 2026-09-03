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

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

const testimonials = [
  {
    photo: "src/giorgiberidze.png",
    quote:
      "Nikusha completely reworked our onboarding flow. Drop-off dropped by 30% within the first month after launch.",
    name: "Giorgi Beridze",
    role: "CEO, vaer Startup",
  },
  {
    photo: "src/ana kapanadze.png",
    quote:
      "Clear communication from day one, and the final designs were pixel-perfect. Our developers had zero questions during handoff.",
    name: "Ana Kapanadze",
    role: " VR Product Manager",
  },
  {
    photo: "src/levan wereteli.png",
    quote:
      "We needed a full brand refresh in three weeks. Nikusha delivered on time without cutting corners on quality.",
    name: "Levan Tsereteli",
    role: "mcdonald's Marketing Director",
  },
  {
    photo: "src/mariamgogia.png",
    quote:
      "Genuinely one of the best designers I've worked with — thinks like a developer, which made collaboration effortless.",
    name: "Mariam Gogia",
    role: "Founder of onlineshopping",
  },
];

const testimonialCard = document.querySelector("#testimonial-card");
const testimonialDots = document.querySelectorAll(".dot");

function renderTestimonial(index) {
  const data = testimonials[index];
  if (!data || !testimonialCard) return;

  testimonialCard.querySelector(".testimonial-photo").src = data.photo;
  testimonialCard.querySelector(".quote").textContent = data.quote;
  testimonialCard.querySelector(".testimonial-name").textContent = data.name;
  testimonialCard.querySelector(".testimonial-role").textContent = data.role;

  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    renderTestimonial(index);
  });
});

renderTestimonial(0);
