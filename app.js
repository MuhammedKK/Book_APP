// Book Class -> Represent A Book Object 

class Book {
    constructor(title, author, isbin) {
        this.title  = title;
        this.author = author;
        this.isbin  = isbin;
    }
}

// UI Class -> Represent Book Style  


class UI {
    static displayBook() {
        // Get The Books That's Stored In Local Storage
        const books = StoreInLocal.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    // Add Book Method
    static addBookToList(book) {
        const booksList = document.querySelector(".book-list");

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbin}</td>
            <td><a href="#" class="btn btn-danger btn-sm deleteBtn">X</a></td>
        `;

        booksList.appendChild(row);
    }

    // Clear Inputs Method

    static clearInputs() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbin").value = "";
    }

    // Remove Book Method

    static removeBook(book) {
        // check If Book Has Deleted Btn

        if(book.classList.contains("deleteBtn")) {
            book.parentElement.parentElement.remove();
            // console.log("book")
        }
    }

    // Actions Messages

    static showMsg(msg, errType = "danger") {
        // Create Message Div
        let div = document.createElement("div");
        div.className = `alert alert-${errType}`;
        div.textContent = msg;
        
        // Append Div Up The Form
        let myCont = document.querySelector(".container");
        let form = document.querySelector("#book-form");
        myCont.insertBefore(div, form)

        setTimeout(() => div.remove(), 2000);
    }
}


// Store Class : Handles Local Storage 

class StoreInLocal {
    static getBooks() {
        // Intilize Book Array
        let books;
        // Check If Localstorage Is Empty Or Not
        if(localStorage.getItem("books") === null) { // If It's Empty
            // Make The Array Empty
            books = [];
        } else { // Else There's Books There
            
            books = JSON.parse(localStorage.getItem("books")); 
        }

        return books;

    }
    static addBook(book) {
        // Get The Stored Books
        let books = StoreInLocal.getBooks();
        // Push The Book To The Books List
        books.push(book);

        // Set The Book That Has Been Added To LocalStorage
        localStorage.setItem("books", JSON.stringify(books));
    } 
    static removeBook(isbin) {
        // Get The Books
        let books = StoreInLocal.getBooks();
        // Looping Throught The Books Array To Get The Data
        books.forEach((book, index) => {
            if(book.isbin === isbin) {
                books.splice(index, 1);
            } 
        });

        // Set The Items After Deleting The Book To LocalStorage
        localStorage.setItem("books", JSON.stringify(books))
    }
}

// Event Display Books 

document.addEventListener("DOMContentLoaded", UI.displayBook());

/* Event : Add A Book */

// Get Add Button

let form = document.querySelector("#book-form");

form.addEventListener("submit", () => {

    // Get Book Inputs Data
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbin = document.querySelector("#isbin").value

    // Validation 

    if(title === "" || author === "" || isbin === "") {
        UI.showMsg("Plz Fill In Inputs With Data");
    } else {
        // Take A Instantiation From Book Class
        let myBook = new Book(title, author, isbin);

        // Add Book To UI Table

        UI.addBookToList(myBook);

        // Add To The Localstorage
        
        StoreInLocal.addBook(myBook);

        // Clear Inputs After Submitting

        UI.clearInputs();

        // Show Success Added Book
        UI.showMsg("Book Has Been Added", "success");
    }

});

/* Event : Remove A Book */

// Get The Table Body 

let bookList = document.querySelector(".book-list");

bookList.addEventListener("click", (e) => {
    // console.log(e.target);
    // Remove The Book From UI Table
    UI.removeBook(e.target);
    // Remove From Localstorage
    StoreInLocal.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // console.log(e.target.parentElement.previousElementSibling.textContent);

    // Show Removed Message
    if(e.target.classList.contains('deleteBtn')) {
        UI.showMsg("Book Has Been Deleted", "success");
    }
});

