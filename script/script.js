// using this function for getting all element from page using id.
const elementById = (elementId) => document.getElementById(elementId);

const searchBox = elementById("search-input-box");
const searchButton = elementById("search-input-button");

const messageBox = elementById("messages");
const resultArea = elementById("result_items");

// this will show error and success message
const showMessage = (message, alertType = "success") => {
  messageBox.innerHTML = `
        <div class="alert alert-${alertType}" role="alert">
           ${message}
        </div>
    `;
};

// creating card element for every book.
const createBookCard = (bookInfo) => {
  const { title, author_name, first_publish_year, publisher, cover_i } =
    bookInfo;

  const bookTitle = title ? title : "title not found.";

  const bookCoverPhoto = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : "images/notFound.png";

  const bookAuthor =
    author_name?.length > 0
      ? `<h6>By ${author_name[0]}.</h6>`
      : "<h6>author not found</h6>";

  const bookPublisher =
    publisher?.length > 0
      ? `Published by ${publisher[0]}.`
      : "publisher not found";

  const firstPublishYear = first_publish_year
    ? `First released on ${first_publish_year}`
    : "release date not found.";

  return `
    <div>
        <div class="card">
            <img src="${bookCoverPhoto}" class="card-img-top">
            <div class="card-body">
                <h4 class="card-title">${bookTitle}</h4>
                <hr/>
                  <p class="my-0">${bookAuthor}</p> 
                <hr/>
                  <p class="my-0">${bookPublisher}</p> 
                <hr/>
                <p class="my-0">${firstPublishYear}</p> 
            </div>
        </div>
    </div>
    `;
};

const showResults = (bookResults) => {
  // if numFound === 0  thats mean no book found.. bookResults.numFound == 0 means false
  // if i reverse it !false === true.. then i will show not found message..
  if (!bookResults.numFound) {
    showMessage("Sorry, No Result Found :(", "warning");
    return;
  }

  showMessage(`About ${bookResults.numFound} results found.`);

  // showing 25 result from total searched books.
  const booksInfo = bookResults.docs.splice(0, 24);
  booksInfo.forEach((bookInfo) => {
    const bookCard = document.createElement("div");
    bookCard.innerHTML = createBookCard(bookInfo);
    resultArea.appendChild(bookCard);
  });
};

//  fetching data from api
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

  // cleaning error and results before searching again.
  resultArea.textContent = "";
  messageBox.textContent = "";

  fetchDataFromApi(searchText);
};
