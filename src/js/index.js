import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

import { fetchBreeds } from './api/cat-api';
import { createMarkup } from './markup/markup';
import { selectEl } from './refs/refs';
import { addMarkup } from './utils/utls';
import { fetchCatByBreed } from './api/cat-api';
import { divCatEl } from './refs/refs';
import { createCatMarkup } from './markup/markup';
import { loadEl } from './refs/refs';

window.addEventListener('load', onLoad);

function onLoad() {
  fetchBreeds()
    .then(respone => {
      const markupOption = createMarkup(respone);

      addMarkup(selectEl, markupOption);
      new SlimSelect({
        select: '#selectElement',
      });
    })
    .catch(error => console.log(error.message));
}

selectEl.addEventListener('change', onChange);

function onChange(event) {
  const id = event.target.value;
  loadEl.classList.add('active');
  divCatEl.classList.remove('active');
  fetchCatByBreed(id)
    .then(response => {
      const catInfo = response[0];
      const cat = createCatMarkup(catInfo);
      divCatEl.innerHTML = cat;
      divCatEl.classList.add('active');
      loadEl.classList.remove('active');
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops!!! There is no cat!!! &#128008 Maybe he was scared by an angry dog!!! &#128021',
        {
          width: '500px',
          timeout: '5000',
          fontSize: '25px',
          opacity: 0.7,
        }
      );
      loadEl.classList.remove('active');
    });
}
