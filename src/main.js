const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("nav-list");
const isActive = document.getElementById("isActive");

let isOpen = false;

menuToggle.addEventListener("click", () => {
  isOpen = !isOpen;

  isActive.src = isOpen ? "/icons/close.png" : "/icons/menu.png";

  navList.classList.toggle("hidden", !isOpen);
  navList.classList.toggle("flex", isOpen);
});
