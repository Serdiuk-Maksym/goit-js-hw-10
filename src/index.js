import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loader = document.querySelector('.loader');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function clearCatInfo() {
  const catInfo = document.querySelector('.cat-info');
  catInfo.innerHTML = '';
}

// Отримати початковий список порід при завантаженні сторінки
fetchBreeds().then(breeds => {
  const breedSelect = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  hideLoader(); // Приховуємо завантажувач після завершення запиту
});

// Обробка вибору опції у селекті
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    showLoader(); // Показуємо завантажувач перед початком запиту
    clearCatInfo(); // Видаляємо попередні дані про кота

    fetchCatByBreed(selectedBreedId).then(cat => {
      if (cat) {
        // Відображення даних про кота
        const image = document.createElement('img');
        image.src = cat.url;
        image.width = 800;
        catInfo.appendChild(image);

        if (cat.breeds && cat.breeds.length > 0) {
          const breedInfo = document.createElement('div'); // Створюємо контейнер для породи
          breedInfo.innerHTML = `
            <h3>Name: ${cat.breeds[0].name}</h3>
            <p>Description: ${cat.breeds[0].description}</p>
            <p>Temperament: ${cat.breeds[0].temperament}</p>
          `;
          catInfo.appendChild(breedInfo);
        } else {
          // Якщо відсутня інформація про породу
          const noBreedInfo = document.createElement('p');
          noBreedInfo.textContent = 'Breed information not available.';
          catInfo.appendChild(noBreedInfo);
        }
      } else {
        // Обробка помилки
        catInfo.textContent = 'Failed to fetch cat information.';
      }

      hideLoader(); // Приховуємо завантажувач після завершення запиту
    });
  } else {
    clearCatInfo(); // Видаляємо попередні дані про кота
    // Очистка блоку з даними про кота
    catInfo.innerHTML = '';
  }
});
