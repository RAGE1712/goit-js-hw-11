import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '40932900-188c1692f3ee2d04fe74a00db';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH  = 'true';
const PER_PAGE = '40';
let page = '1'


const params = new URLSearchParams({
  key: API_KEY,
  image_type: IMAGE_TYPE,
  orientation: ORIENTATION,
  safesearch: SAFESEARCH,
  per_page: PER_PAGE,
  page
});

export async function getImages(searchTerm, page = 1) {
  const { data } = await axios.get(`${BASE_URL}/?${params}&q=${searchTerm}`);
    return data.hits;
}

