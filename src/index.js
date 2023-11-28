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
let page = '1';

const params = new URLSearchParams({
  key: API_KEY,
  image_type: IMAGE_TYPE,
  orientation: ORIENTATION,
  safesearch: SAFESEARCH,
  per_page: PER_PAGE,
  page,
});

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  input: document.querySelector('input')
};

refs.form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
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
  getImages(searchTerm, page = 1);
  refs.loadMoreBtn.addEventListener('click', handleLoadMore);
  refs.loadMoreBtn.classList.remove('is-hidden');
}

// async function getImages(searchTerm, page = 1) {
//     try {
//       const { data } = await axios.get(
//         `${BASE_URL}/?${params}&q=${searchTerm}`
//       );
//       refs.gallery.innerHTML = createGalleryMarkup(data.hits);
//     } catch (error) {
//       Notiflix.Notify.failure(
//         `❌ Sorry, there is no images matching your search querry. Please try again. ❌`
//       );
//       console.log(error);
//     }
//   };

function handleLoadMore() {
  const searchTerm = document.querySelector('input').value
    .trim()
  console.log(searchTerm)
  page += 1
  const data = getImages(searchTerm, page) 
  console.log(data)
  refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data));
}
  
async function getImages(searchTerm, page = 1) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/?${params}&q=${searchTerm}`
      );
      refs.gallery.innerHTML = createGalleryMarkup(data.hits);
    } catch (error) {
      Notiflix.Notify.failure(
        `❌ Sorry, there is no images matching your search querry. Please try again. ❌`
      );
      console.log(error);
    }
  };


//   try {
//     const images = await getImages(searchTerm)
    
//     console.log(images);
//     refs.gallery.innerHTML = createGalleryMarkup(images);
//     if (createGalleryMarkup(images) === "") {
//       Notiflix.Notify.failure(
//         `❌ Sorry, there is no images matching your search querry. Please try again. ❌`
//       );
//     }
//   } catch (error) {
//     Notiflix.Notify.failure(`❌ Sorry, there is no images matching your search querry. Please try again. ❌`);
//     console.log(error)
//   }
//   finally {
//     refs.loadMoreBtn.classList.remove('is-hidden');
//     refs.loadMoreBtn.addEventListener('click', handleLoadMore);
//   }
  
// }

// let page = 1;
// function handleLoadMore() {
//   page += 1;
//   const images = getImages(searchTerm, page);
//   console.log(images);
//   refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));
  
// }