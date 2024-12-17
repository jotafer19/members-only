const dropdownButton = document.querySelector(".dropdown-btn");
const openMenuIcon = document.querySelector(".open-menu");
const closeMenuIcon = document.querySelector(".close-menu");
const dropdownContent = document.querySelector(".dropdown-list");

dropdownButton.addEventListener("click", (event) => {
  event.stopPropagation();
  dropdownContent.classList.toggle("show");
  openMenuIcon.classList.toggle("hide");
  closeMenuIcon.classList.toggle("hide");
});

document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".dropdown-content") &&
    dropdownContent.classList.contains("show")
  ) {
    dropdownContent.classList.toggle("show");
    openMenuIcon.classList.toggle("hide");
    closeMenuIcon.classList.toggle("hide");
  }
});
