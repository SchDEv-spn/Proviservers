document.addEventListener("DOMContentLoaded", function () {
  const navbarCollapse = document.getElementById("navbarNav");
  const navList = navbarCollapse.querySelector(".navbar-nav");

  if (!navbarCollapse || !navList) return;

  navbarCollapse.addEventListener("shown.bs.collapse", function () {
    navList.classList.add("show-items");
  });

  navbarCollapse.addEventListener("hidden.bs.collapse", function () {
    navList.classList.remove("show-items");
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".arrow-btn.prev");
  const nextBtn = document.querySelector(".arrow-btn.next");
  let currentIndex = 0;

  function showTestimonial(index) {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showTestimonial(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showTestimonial(currentIndex);
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    showTestimonial(currentIndex);
  }, 5000);
  
  showTestimonial(currentIndex);
});
