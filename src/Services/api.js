import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '26892928-0350ac38f5a4fefac1968de01';

async function fetchImages(query, page) {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}

export default fetchImages;
