import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
// import { getImages } from './partials/images-api'
import { createGalleryMarkup } from './partials/gallery-markup';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '40932900-188c1692f3ee2d04fe74a00db';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
const PER_PAGE = '40';
let page = 1;

const params = new URLSearchParams({
  key: API_KEY,
  image_type: IMAGE_TYPE,
  orientation: ORIENTATION,
  safesearch: SAFESEARCH,
  per_page: PER_PAGE,
  page: page,
});

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  input: document.querySelector('input')
};

refs.form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
  page = 1
  params.set('page', page);
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  const searchTerm = formData
    .get('searchQuery')
    .trim()
  
  if (searchTerm === '') {
    Notiflix.Notify.failure(
      `❌ Input search request!! ❌`
    );
  }
  images = await getImages(searchTerm);
  totalHits = images.totalHits;
  console.log(images.hits);
  refs.gallery.innerHTML = createGalleryMarkup(images.hits);
  refs.loadMoreBtn.addEventListener('click', handleLoadMore);
  refs.loadMoreBtn.classList.remove('is-hidden');
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images. `);
}


async function handleLoadMore() {
  refs.loadMoreBtn.classList.add('is-hidden');
  const searchTerm = document.querySelector('input').value
    .trim()
  page += 1
  params.set('page', page)
  images = await getImages(searchTerm, page);
  
  nextpage = createGalleryMarkup(images.hits);
  refs.gallery.insertAdjacentHTML('beforeend', nextpage);

  if (nextpage != '') {
    refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
  }
  
  }
  
async function getImages(searchTerm, page = 1) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/?${params}&q=${searchTerm}`
      );
      return data;
    } catch (error) {
      Notiflix.Notify.failure(
        `❌ Sorry, there is no images matching your search querry. Please try again. ❌`
      );
      console.log(error);
    }
  };
