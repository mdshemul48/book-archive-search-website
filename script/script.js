const elementById = (elementId) => document.getElementById(elementId);

const searchBox = elementById("search-input-box");
const searchButton = elementById("search-input-button");

const showMessage = (message, alertType = "success") => {
  elementById("messages").innerHTML = `
        <div class="alert alert-${alertType}" role="alert">
           ${message}
        </div>
    `;
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
    console.log(fetchedJsonData);
  } catch (err) {}
};

searchButton.onclick = () => {
  const searchText = searchBox.value;
  fetchDataFromApi(searchText);
};
