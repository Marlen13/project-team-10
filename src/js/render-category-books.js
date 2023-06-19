// Рендер однієї секції категорії з книгами
import { fetchBooksByExactCategory, fetchTopBooks } from './fetch-func';
import { renderTopBooks } from './render-category-books';

export function renderCategoryBooks() { }

import { modalWindow } from './modal-window'
// export function renderCategoryBooks() { }


const categoryList = document.querySelector('.category-list');
const bookThumb = document.querySelector('.tb-container');
const headingEl = document.querySelector('.heading-primary');
const allCtgrEl = document.querySelector('#bestOfbooks')

categoryList.addEventListener('click', renderCategoryBooks);
async function renderCategoryBooks(event) {
  const item = event.target.textContent;
  const itemFirst = allCtgrEl.textContent;
  if (item === itemFirst) {
    fetchTopBooks().then
      (renderTopBooks);
      headingEl.textContent = item;
  }
 
  const data = await fetchBooksByExactCategory(item);
  console.log(data);
  createMarkupBook(data);
  // const startTitle = list_name
  // const endTitle = list_name.split(' ')[list_name.split(' ').length - 1];
  
  headingEl.textContent = item;
headingEl.classList.add('ctg-maintitle');
bookThumb.classList.add('flex-container');
}

function createMarkupBook({ data }) {
  bookThumb.innerHTML = '';
  const markup = data

    .map(({ author, title, book_image, _id }) => {
      return `
    <div class="flex-container-item"><a href=# class="book-item-thumb global-link" data-id="${_id}">
    <img class="book-img img" src="${book_image}" alt="${title}">
    <p class="book-title light-theme theme-switch global-p">${title}</p>
    <p class="tb-book-author global-p">${author}</p></a></div>`;

    })
    .join('');
  bookThumb.innerHTML = markup;
}

// export function renderTopBooks() { }

const containerTbEl = document.querySelector('.tb-container');
const noBooksEl = document.querySelector('.no-books-card');

fetchTopBooks().then(renderTopBooks);

export function renderTopBooks(bestsellersArray) {
  if (bestsellersArray.data.length == 0) {
    noBooksEl.classList.remove('is-hidden');
  } else {
    const markupCategory = bestsellersArray.data
      .map(({ list_name, books }) => {
        const markup = books
          .map(({ author, title, book_image, _id }) => {
            return `
          <li class="flex-container-item">
            <a href=# class="global-link" data-id="${_id}">
              <div class="tb-book-card">
                <img class="tb-book-img img" src="${book_image}" alt="${title}">
                <p class="tb-book-title light-theme theme-switch global-p">${title}</p>
                <p class="tb-book-author global-p">${author}</p>
              </div>
            </a>
          </li>
          `;
          })
          .join('');
        return `
      <div class="tb-category-container">
        <h2 class='tb-category global-title'>${list_name}</h2>
        <div class='tb-books-container'>
          <ul class="global-list flex-container">
            ${markup}
          </ul>
        </div>
        <button class="tb-button global-button light-theme theme-switch">See more</button>
      </div>
      `;
      })
      .join('');

    containerTbEl.insertAdjacentHTML('beforeend', markupCategory);
    modalWindow()
  }
}
