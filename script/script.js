const elementById = (elementId) => document.getElementById(elementId);

const searchBox = elementById("search-input-box");
const searchButton = elementById("search-input-button");

const messageBox = elementById("messages");

const showMessage = (message, alertType = "success") => {
  messageBox.innerHTML = `
        <div class="alert alert-${alertType}" role="alert">
           ${message}
        </div>
    `;
};

const showResults = (bookResults) => {
  // if numFound === 0  thats mean no book found.. bookResults.numFound == 0 means false
  // if i reverse it !false === true.. then i will show not found message..
  if (!bookResults.numFound) {
    showMessage("Sorry, No Result Found :(", "warning");
  }
};

const fetchDataFromApi = async (searchText) => {
  const searchUrl = `https://openlibrary.org/search.json?q=${searchText}`;
  try {
    const fetchData = await fetch(searchUrl);
    // if server return any server error then i will throw that error and handle it in catch area with function
    if (!fetchData.ok) {
      throw new Error("something went wrong with the server.");
    }
    const fetchedJsonData = await fetchData.json();
    showResults(fetchedJsonData);
  } catch (err) {
    showMessage(err.message, "danger");
  }
};

searchButton.onclick = () => {
  const searchText = searchBox.value;
  fetchDataFromApi(searchText);
};
