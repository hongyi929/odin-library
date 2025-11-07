// DOM References
let libraryDiv = document.querySelector(".library");
let openFormButton = document.querySelector(".add");
let addBookButton = document.querySelector(".submit")
let closeFormButton = document.querySelector(".close");;
let form = document.querySelector(".form");

let nameInput = document.querySelector("#name");
let authorInput = document.querySelector("#author")
let pageInput = document.querySelector("#pages")
let readStatusInput = document.querySelector("#read-status");

const myLibrary = [];

function Book(name, author, pages, readStatus) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, pages, readStatus) {
  // Create the book object
  // Store the book object in the array
  let book = new Book(name, author, pages, readStatus);
  myLibrary.push(book);
}

function displayLibrary() {
  libraryDiv.innerHTML =""
  for (let i = 0; i < myLibrary.length; i++) {
    // Display books with the data from the library item
    let newDiv = document.createElement("div");
    libraryDiv.appendChild(newDiv);
    newDiv.innerHTML = `${myLibrary[i].name} by ${myLibrary[i].author} <br> ${
      myLibrary[i].pages
    } pages long <br> <button class="read-button">${
      myLibrary[i].readStatus ? "Have Read" : "Not yet read"
    }</button> 
        <button class="remove"> Remove </button>`;
    newDiv.className = "book";

    let removeButton = newDiv.querySelector(".remove");
    let bookId = myLibrary[i].id;
    removeButton.addEventListener("click", () => removeBook(bookId));

    let readButton = newDiv.querySelector(".read-button");
    readButton.addEventListener("click", () => {
      changeRead(bookId, readButton);
    });

  }
}

addBookToLibrary("The Hobbit", "Tolkien", 294, true);
addBookToLibrary("Ruby M", "Tolkien", 294, true);
addBookToLibrary("Serenade", "Tolkien", 294, true);
displayLibrary();

openFormButton.addEventListener("click", () => {
  form.style.display = "flex";  
})

closeFormButton.addEventListener("click", () => {
  form.style.display = "none";
})

addBookButton.addEventListener("click", () => {
  event.preventDefault();

  let bookName = nameInput.value;
  let authorName = authorInput.value;
  let pages = pageInput.value;
  let readBool = readStatusInput.checked;

  addBookToLibrary(bookName, authorName, pages, readBool)
  displayLibrary();
})

function removeBook(id) {
  let index = myLibrary.findIndex((item) => item.id === id);
  myLibrary.splice(index, 1);
  libraryDiv.innerHTML = "";
  displayLibrary();
  console.log("hi");
}

function changeRead(bookId, readButton) {
  index = myLibrary.findIndex((item) => item.id === bookId);
  myLibrary[index].readStatus = !myLibrary[index].readStatus;
  readButton.textContent = myLibrary[index].readStatus
    ? "Have Read"
    : "Not yet read";
}
