'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, neighbour = '') {
  const html = `<article class="country ${neighbour}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data ">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${
      Object.entries(data.languages)[0][1]
    }</p>
    <p class="country__row"><span>💰</span>${
      data.currencies[Object.keys(data.currencies)[0]].name
    }</p>
  </div>
   </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
//////////////////////////////////////
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    renderCountry(data);
    const neighbour = data.borders?.[0];
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};
const countryInput = document.querySelector('#country');
const submitButton = document.querySelector('#submit-btn');
submitButton.addEventListener('click', event => {
  event.preventDefault(); // prevent form from submitting

  const countryName = countryInput.value;
  getCountryAndNeighbour(countryName);
  countryInput.value = '';
});
const clear = document.querySelector('.clearall');
clear.addEventListener('click', function () {
  countriesContainer.innerHTML = '';
  countryInput.value = '';
});
