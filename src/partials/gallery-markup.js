export function createGalleryMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <div class="photo-card">
        <div class="image-container">
        <a class="gallery__link" href="${largeImageURL}">
          <img
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
          /></a>
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Coomments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
        </div>
      `
    )
    .join('');
}
