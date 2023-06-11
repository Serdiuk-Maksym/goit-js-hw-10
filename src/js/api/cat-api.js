//отримую api
const urlHost = `https://api.thecatapi.com/v1`;
const apiKey =
  'live_c6s9VOlFzUCxJDuCdm6rjcaY29qekTUMZdAgJLbITcwYoVjPsFQ3leMNbra2UwO6';

export function fetchBreeds() {
  return fetch(`${urlHost}/breeds`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(id) {
  return fetch(
    `${urlHost}/images/search?breed_ids=${id}&api_key=${apiKey}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }
    return response.json();
  });
}
