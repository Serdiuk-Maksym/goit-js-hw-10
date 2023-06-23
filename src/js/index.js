import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import 'slim-select/dist/slimselect.css';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

// Приховати div.cat-info, показати p.loader
catInfo.style.display = 'none';
loader.style.display = 'block';
error.style.display = 'none';

// Код, що виконується при завантаженні сторінки
fetchBreeds().then(breeds => {
  const options = breeds.map(breed => {
    const optionElement = document.createElement('option');
    optionElement.value = breed.id;
    optionElement.textContent = breed.name;
    return optionElement;
  });

  options.forEach(option => {
    breedSelect.appendChild(option);
  });

  loader.style.display = 'none';
  breedSelect.style.display = 'block';

  new SlimSelect({
    select: '.breed-select',
  });
});

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  // Приховати div.cat-info, показати p.loader
  catInfo.style.display = 'none';
  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      return data[0]; // Оскільки ми отримуємо масив з одним котом, повертаємо перший елемент
    })
    .then(cat => {
      catInfo.innerHTML = ''; // Очистити вміст блоку перед додаванням нової інформації

      const image = document.createElement('img');
      image.src = cat.url;
      image.classList.add('cat_img');
      image.setAttribute('loading', 'lazy');
      catInfo.appendChild(image);

      const breedInfo = document.createElement('div');
      breedInfo.classList.add('breed-info');

      const breedName = document.createElement('p');
      breedName.classList.add('title');

      const breedText = document.createTextNode(`Breed: `);
      breedName.appendChild(breedText);

      const breedSpan = document.createElement('span');
      breedSpan.textContent = cat.breeds[0].name;
      breedSpan.classList.add('text');
      breedName.appendChild(breedSpan);

      breedInfo.appendChild(breedName);

      const description = document.createElement('p');
      description.classList.add('title');

      const descriptionText = document.createTextNode(`Description: `);
      description.appendChild(descriptionText);

      const descriptionSpan = document.createElement('span');
      descriptionSpan.textContent = cat.breeds[0].description;
      descriptionSpan.classList.add('text');
      description.appendChild(descriptionSpan);

      breedInfo.appendChild(description);

      const temperament = document.createElement('p');
      temperament.classList.add('title');

      const temperamentText = document.createTextNode(`Temperament: `);
      temperament.appendChild(temperamentText);

      const temperamentSpan = document.createElement('span');
      temperamentSpan.textContent = cat.breeds[0].temperament;
      temperamentSpan.classList.add('text');
      temperament.appendChild(temperamentSpan);

      breedInfo.appendChild(temperament);

      catInfo.appendChild(breedInfo);

      // Приховати p.loader, показати div.cat-info
      catInfo.style.display = 'block';
      loader.style.display = 'none';
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Error',
        'Oops! Something went wrong! Try reloading the page!',
        'OK'
      );
      console.error('Oops! Something went wrong! Try reloading the page!');
      loader.style.display = 'none';
    });
});
