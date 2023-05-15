// Add imports above this line
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items';
const cardsContainer = document.querySelector(`.gallery`);
const galleryMarkup = createGalleryMarkup(galleryItems);
cardsContainer.insertAdjacentHTML(`beforeend`, galleryMarkup);
function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    </li>`;
    })
    .join('');
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
gallery.on('show.simplelightbox', function () {});