// Retrieve the search history from local storage or create an empty array
const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Get references to DOM elements
const historyContainer = document.getElementById("search-history-container");
const homeBtn = document.getElementById("homeBtn");

// Loop through the search history and create an item for each search
searchHistory.forEach((search, index) => {
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-item");
  historyItem.setAttribute("data-index", index);

  const historyText = document.createElement("div");
  historyText.classList.add("history-text");

  // Store the search query text and ID in local storage
  localStorage.setItem(`searchQuery_${search.id}`, search.query);

  historyText.innerHTML = `
    <div class="tableContains">
      <div>${search.id}.  ${search.query}</div>
      <div>Searched on ${search.date}  at ${search.time}</div>
    </div>
  `;

  // Add event listener to historyText element
  historyText.addEventListener("click", function () {
    // Navigate to the home page
    window.location.href = "/";
  });

  historyItem.appendChild(historyText);
  historyContainer.appendChild(historyItem);
});

const clearHistoryBtn = document.getElementById("clear-history-btn");

// An event listener to the clear history to remove the search history from localStorage
clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("searchHistory");
  historyContainer.innerHTML = "";
});

// Add an event listener to the home button to redirect the user to the home page
homeBtn.addEventListener("click", function () {
  window.location.href = "/";
});
