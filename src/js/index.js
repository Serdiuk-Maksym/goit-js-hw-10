import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import 'slim-select/dist/slimselect.css';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

// Приховати select.breed-select та div.cat-info, показати p.loader
breedSelect.style.display = 'none';
catInfo.style.display = 'none';
loader.style.display = 'block';
error.style.display = 'none';

// Код, що виконується при завантаженні сторінки
fetchBreeds().then(breeds => {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  // Приховати p.loader, показати select.breed-select
  breedSelect.style.display = 'block';
  loader.style.display = 'none';

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    // Приховати div.cat-info, показати p.loader
    catInfo.style.display = 'none';
    loader.style.display = 'block';

    fetchCatByBreed(selectedBreedId).then(cat => {
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
    });
    // .catch(error => {
    //   error.style.display = 'block';
    //   console.error(error);
    // });

    // Ініціалізувати SlimSelect на елементі .breed-select
    const select = new SlimSelect({
      select: breedSelect,
    });
  });
});
// .catch(error => {
//   error.style.display = 'block';
//   console.error();
// });
