// Access the menu toggle btn , close btn, and menu
const toggelBtn = document.querySelector(".toggel-btn");
const closeBtn = document.querySelector(".close-btn");
const menu = document.querySelector(".nav-menu");

// toggel Btn Event
toggelBtn.addEventListener("click", (e) => {
    menu.classList.remove("animate-hide");
    menu.classList.add("nav-menu-show");
});

// Close  Btn Event
closeBtn.addEventListener("click", (e) => {
  menu.classList.add("animate-hide");
  setTimeout(() => {
    menu.classList.remove("nav-menu-show");
  }, 450);
});
