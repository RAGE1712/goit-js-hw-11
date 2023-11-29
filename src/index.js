import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
import { createGalleryMarkup } from './partials/gallery-markup';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
let endOfResultsShown = false;

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('input')
};
window.addEventListener('scroll', handleScroll);


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
  } else{
    images = await getImages(searchTerm);
    totalHits = images.totalHits;
    // console.log(images.hits);
    refs.gallery.innerHTML = createGalleryMarkup(images.hits);
    smoothScroll();
    if (totalHits !== 0) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images. `);
    } else {
      Notiflix.Notify.failure(
        `❌ Sorry, there is no images matching your search querry. Please try another request. ❌`
      );
    }
  }
  lightbox.refresh()
  endOfResultsShown = false;
}


async function handleLoadMore() {
const searchTerm = document.querySelector('input').value.trim();
page += 1;
params.set('page', page);

try {
  const { data } = await axios.get(`${BASE_URL}/?${params}&q=${searchTerm}`);

  if (data.hits.length > 0) {
    const nextpage = createGalleryMarkup(data.hits);
    refs.gallery.insertAdjacentHTML('beforeend', nextpage);
    lightbox.refresh();
    smoothScroll();
  } else {
    if (!endOfResultsShown) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      endOfResultsShown = true;
    }
  }
} catch (error) {
  Notiflix.Notify.failure(
    `❌ Failed to load more images. Please try later. ❌`
  );
  console.error(error);
}
  }
  
async function getImages(searchTerm, page = 1) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/?${params}&q=${searchTerm}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

 
 let lightbox = new SimpleLightbox('.gallery a', {
   captionsData: 'alt',
   captionPosition: 'bottom',
   captionDelay: 250,
 });

 function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    handleLoadMore();
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}