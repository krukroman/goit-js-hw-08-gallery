const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryListRef = document.querySelector('.js-gallery');
const modalWindowRef = document.querySelector('.js-lightbox');
const lightBoxImageRef = modalWindowRef.querySelector('.lightbox__image');
const galleryMarkup = makeGalleryMarkup(galleryItems);
galleryListRef.insertAdjacentHTML('beforeend', galleryMarkup);
const imagesCollectionRef = [
  ...galleryListRef.querySelectorAll('.gallery__image'),
];
let index = 0;

galleryListRef.addEventListener('click', openModal);

// =============Markup================
function makeGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"          
        />
      </a>
    </li>
  `;
    })
    .join('');
}
// =============END Markup================

function openModal(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  modalWindowRef.classList.add('is-open');

  setSrc(event);

  index = getCurrentIndex(event);

  setEventListeners();
}

function closeModal(event) {
  if (
    event.target.classList.value !== 'lightbox__overlay' &&
    event.target.classList.value !== 'lightbox__button' &&
    event.code !== 'Escape'
  ) {
    return;
  }

  clearSrc();

  removeEventListeners();

  modalWindowRef.classList.remove('is-open');
}

function setSrc(event) {
  lightBoxImageRef.src = `${event.target.dataset.source}`;
  lightBoxImageRef.alt = `${event.target.alt}`;
}

function getCurrentIndex(event) {
  return imagesCollectionRef.indexOf(event.target);
}

function changeSrc(index) {
  lightBoxImageRef.src = `${imagesCollectionRef[index].dataset.source}`;
  lightBoxImageRef.alt = `${imagesCollectionRef[index].alt}`;
}
function clearSrc() {
  lightBoxImageRef.src = '';
  lightBoxImageRef.alt = '';
}

function setEventListeners() {
  modalWindowRef.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
  window.addEventListener('keydown', nextImage);
  window.addEventListener('keydown', prevImage);
}

function removeEventListeners() {
  modalWindowRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModal);
  window.removeEventListener('keydown', nextImage);
  window.removeEventListener('keydown', prevImage);
}

function nextImage(event) {
  if (event.code !== 'ArrowRight') {
    return;
  }
  index += 1;
  index > imagesCollectionRef.length - 1 && (index = 0);

  changeSrc(index);
}

function prevImage(event) {
  if (event.code !== 'ArrowLeft') {
    return;
  }
  index -= 1;
  index < 0 && (index = imagesCollectionRef.length - 1);

  changeSrc(index);
}
