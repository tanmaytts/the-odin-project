const myLibrary = [];

function Book(id, name, pages) {
    this.id = id;
    this.name = name;
    this.pages = pages;
}

function addBookToLibrary(name, pages) {
    const id = crypto.randomUUID();
    //console.log(id); 

    let book = new Book(id, name, pages);

    myLibrary.push(book);
}

function displayBooks() {

    const tableBody = document.getElementById("book-table-body");
    tableBody.innerHTML = "";


    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.pages}</td>
            <td>${book.id}</td>
        `;

        tableBody.appendChild(row);
    }
}

const btn = document.getElementById("add-book");

btn.addEventListener("click", () => {
        document.getElementById("add-book-form").style.display = "block";
})

document.getElementById("book-form").addEventListener("submit", (event) => {
    event.preventDefault();   // <-- stops the page reload
    submitBook();
});

function submitBook() {
    const name = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;

    addBookToLibrary(name, pages);

    document.getElementById("add-book-form").style.display = "none";
    document.getElementById("title").value = "";
    document.getElementById("pages").value = "";

    console.log(myLibrary);
    displayBooks();
}