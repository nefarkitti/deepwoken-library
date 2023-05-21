let page = 0

const headTitle = document.getElementById("head-title")

const metaTitle = document.getElementById("meta-title")
const metaDesc = document.getElementById("meta-desc")
const metaDesc2 = document.getElementById("meta-desc2")

const bookHeader = document.getElementById("book-header")
const bookTitle = document.getElementById("book-title")
const bookFlavour = document.getElementById("book-flavour")
const bookText = document.getElementById("book-text")
const pageCount = document.getElementById("page-number-text")

let Book

let books = document.querySelectorAll("[id='book-item']");
for (const book of books) {
    book.addEventListener("click", function(){  
        console.log(book.dataset.bookid)
        if (book.dataset.bookid != undefined) {
            console.log(book.dataset.bookid)
            window.location.replace(`./book.html#${book.dataset.bookid}`);
            window.location.hash = book.dataset.bookid
        }
    })
}

function loadBook() {
    axios.get('books.json').then(res => {
        let jsonData = res.data // should be json by default
        console.log(jsonData[0])
        let id = window.location.hash.slice(1)

        console.log(jsonData[id])
        Book = jsonData[id]
        page = 0
    
        headTitle.innerText = `DL - ${Book.name}`

        metaTitle.setAttribute("content", Book.name)
        metaDesc.setAttribute("content", `Read ${Book.name} using the Deepwoken Library.`)
        metaDesc2.setAttribute("content", `Read ${Book.name} using the Deepwoken Library.`)
    
        updatePage(0, Book)
    }).catch(console.error)
    console.log(window.location.hash)
}

function updatePage(n) {
    page += n
    if (page > Book.pages.length-1) {
        page = Book.pages.length-1
    }
    if (page <= 0) {
        page = 0
    }

    bookTitle.innerText = Book.name
    bookFlavour.innerText = Book.flavour
    bookText.innerText = Book.pages[page]
    pageCount.innerText = `${page+1} of ${Book.pages.length}`

    if (page == 0) {
        bookHeader.hidden = false
    } else {
        bookHeader.hidden = true
    }

}

function back() {
    window.location.replace(`./index.html`);
}