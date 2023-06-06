import axios from 'axios';

// const API_KEY = '35107555-f3c90346c08cd3bb4853f7523';
// const BASE_URL = 'https://pixabay.com/api/';

// export const fetchPhoto = async (query, page) => {
//   const searchPhotos = await axios
//     .get(
//       `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12}`
//     )
//     .catch(error => {
//       return new Error(error);
//     });
//   return searchPhotos.data.hits;
// };

export async function fetchPhoto(page, quevery) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '34958458-acf0b4ab26692bebb5071463c';
  const BASE_SEARCH_PARAMS = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  };

  return await axios.get(
    `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&q=${quevery}&page=${page}&safesearch=${BASE_SEARCH_PARAMS.safesearch}`
  );
}
