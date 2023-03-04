// This code fetches book data from Google Books API based on user input,
// displays the book data on the page, and saves the search query and details
// to local storage.

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsHeader = document.getElementById("results-header");
const historyBtn = document.getElementById("historyBtn");

let id;
// Event listener for when user submits search form
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value;
  resultsHeader.textContent = `Book Results For "${query}"`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}`;
  // Fetch book data from Google Books API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const books = data.items;
      saveSearch(query);
      displayBooks(books);
    })
    .catch((error) => {
      console.error(error);
    });
});
// Function to display book data on page
function displayBooks(books) {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";

  // Loop through array of books and create a card for each one
  books.forEach((book) => {
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors.join(", ");
    const image = book.volumeInfo.imageLinks.thumbnail;
    const pageCount = book.volumeInfo.pageCount;
    const publisher = book.volumeInfo.publisher;

    const card = document.createElement("div");
    card.classList.add("card");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const img = document.createElement("img");
    img.src = image;
    imageContainer.appendChild(img);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = `Title : ${title}`;
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Authors : ${authors}`;
    const bookPageCount = document.createElement("p");
    bookPageCount.textContent = `Page Count: ${pageCount}`;
    const bookPublisher = document.createElement("p");
    bookPublisher.textContent = `Publisher: ${publisher}`;

    infoContainer.appendChild(bookTitle);
    infoContainer.appendChild(bookAuthor);
    infoContainer.appendChild(bookPageCount);
    infoContainer.appendChild(bookPublisher);

    card.appendChild(imageContainer);
    card.appendChild(infoContainer);

    resultsContainer.appendChild(card);
  });
}
// Function to save search query and details to local storage
function saveSearch(query) {
  // get existing search history from local storage
  // Get the current date and time
  const now = new Date();
  const searchDate = now.toLocaleDateString();
  const searchTime = now.toLocaleTimeString();

  // Store the search query and search details in localStorage
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  const lastSearch = searchHistory[searchHistory.length - 1];
  const lastId = lastSearch ? lastSearch.id : 0;
  const newSearch = {
    id: lastId + 1,
    query: query,
    date: searchDate,
    time: searchTime,
  };
  searchHistory.push(newSearch);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
//History button takes us to History Page
historyBtn.addEventListener("click", function () {
  window.location.href = "./history/index.html";
});
