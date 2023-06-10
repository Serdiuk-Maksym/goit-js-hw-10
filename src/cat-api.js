export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data =>
      data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }))
    )
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
      return [];
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data[0])
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      return null;
    });
}
