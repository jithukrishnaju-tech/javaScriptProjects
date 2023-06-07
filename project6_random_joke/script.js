const btnSelect = document.querySelector(".getImage");
const imagebox = document.querySelector(".image-section");

const imageElement = document.querySelector(".imageElement");
const fetchDogdata = () => {
  fetch("https://randombig.cat/roar.json")
    .then((res) => res.json())
    .then((data) => {
      imageElement.src = data.url;
      imageElement.width = 300;
      imageElement.height = 200;
    });
};

btnSelect.addEventListener("click", () => {
  fetchDogdata();
});
