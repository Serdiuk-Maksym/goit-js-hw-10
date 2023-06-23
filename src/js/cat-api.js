const apiKey =
  'live_c6s9VOlFzUCxJDuCdm6rjcaY29qekTUMZdAgJLbITcwYoVjPsFQ3leMNbra2UwO6';

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Oops! Something went wrong!');
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Oops! Something went wrong!');
    }
    return response.json();
  });
}
