const show = document.querySelector(".show-modal");
const showContent = document.querySelector(".moral");

show.addEventListener("click", function () {
  showContent.classList.remove("hidden");
});

const close = document.querySelector(".close-modal");
close.addEventListener("click", function () {
  showContent.classList.add("hidden");
});
