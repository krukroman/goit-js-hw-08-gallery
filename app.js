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
const modalWindow = document.querySelector('.js-lightbox');

// =============Markup================
const makeGalleryItemMarkup = ({ preview, original, description }) => {
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
};

const makeGalleryItemEl = galleryItems.map(makeGalleryItemMarkup).join('');

galleryListRef.insertAdjacentHTML('beforeend', makeGalleryItemEl);
// =============END Markup================

// ================Базовий функціонал=====================
// 1. відкриття модалки по кліку на зображення
// 2. рендер оригінального зображення в модалці
// 3. закриття модалки по кліку на бекдроп, по кліку на кнопку "закрити" та при нажатті на клавіщу Escape
galleryListRef.addEventListener('click', openModal);

function setSrc(event) {
  modalWindow.querySelector(
    '.lightbox__image',
  ).src = `${event.target.dataset.source}`;
  modalWindow.querySelector('.lightbox__image').alt = `${event.target.alt}`;
}

function clearSrc() {
  modalWindow.querySelector('.lightbox__image').src = '';
  modalWindow.querySelector('.lightbox__image').alt = '';
}

function setEventListeners() {
  modalWindow.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
}

function removeEventListeners() {
  modalWindow.removeEventListener('clock', closeModal);
  window.removeEventListener('keydown', closeModal);
}

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  modalWindow.classList.add('is-open');

  setSrc(event);

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

  modalWindow.classList.remove('is-open');
}
// ==========================END Базофий фунціонал=====================
