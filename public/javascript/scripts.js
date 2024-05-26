// ! Burger menu toggle
const burger = document.querySelector('.burger');
const burgerWrap = document.querySelector('.burger-wrap');
const navbarToggle = document.querySelector('.navbar-toggle');
const close = document.querySelector('.close-icon');

burgerWrap.addEventListener('click', () => {
  burger.classList.toggle('open');
  navbarToggle.classList.toggle('open');
});

close.addEventListener('click', () => {
  burger.classList.toggle('open');
  navbarToggle.classList.toggle('open');
});


// ! Change header style on scroll
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    const isScrolled = window.scrollY > 50;
    // Toggle the 'active' class on the header based on scroll position
    header.classList.toggle("active", isScrolled);
  });
});


// ! Add active class to navbar link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
      if (link.href === window.location.href) {
          // Add 'nav-link-active' class to the link that matches the current URL
          link.classList.add('nav-link-active');
      }
  });
});







