// Tell Node that we're in test "mode"
// Need to make sure that process.env line is before the require db because it will then determine whether it will use a test or normal db
process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const Book = require('../models/book');

let bookData = {
    "isbn": "1",
    "amazon_url": "https://www.amazon.com/fellowship_of_the_ring",
    "author": "JRR Tolkien",
    "language": "English",
    "pages": 500,
    "publisher": "Tolkien House",
    "title": "The Fellowship of the Ring",
    "year": 1993
}
let bookData2 = {
    "isbn": "123",
    "amazon_url": "https://www.amazon.com/the_hobbit",
    "author": "JRR Tolkien",
    "language": "English",
    "pages": 200,
    "publisher": "Tolkien House",
    "title": "There and back again or The Hobbit",
    "year": 1969
}
let bookData3 = {
    "isbn": "12345",
    "amazon_url": "https://www.amazon.com/the_hobbit_2",
    "author": "JRR Tolkien Jr",
    "language": "American",
    "pages": 420,
    "publisher": "Tokin' House",
    "title": "Here and Here again or The Covid",
    "year": 2020
}


let testBook;
// What we want to do before we test is create a variable where we will be storing the data that we get back and that will just make the testing easier. 
beforeEach(async () => {
    console.log('We are in the before each')
    await Book.create(bookData)
})

afterEach(async () => {
    await db.query(`DELETE FROM books`)
})
afterAll(async () => {
    await db.end()
})

describe("GET /books", () => {
    test('Get a list with all the books', async () => {
        const res = await request(app).get('/books')
        expect(res.statusCode).toBe(200)
        expect(res.body.books.length).toBe(1)
        console.log(res.body)
    })
})

describe("post /books", () => {
    test('Create a single company ', async () => {
        const res = await request(app).post('/books').send(bookData2);
        expect(res.statusCode).toBe(201);
        // console.log(res.body)
        expect(res.body).toEqual({
            book: {
                isbn: '123',
                amazon_url: 'https://www.amazon.com/the_hobbit',
                author: 'JRR Tolkien',
                language: 'English',
                pages: 200,
                publisher: 'Tolkien House',
                title: 'There and back again or The Hobbit',
                year: 1969
            }
        })
    })
})

describe("PUT /books/:isbn", () => {
    test('Updates a single book ', async () => {
        const res = await request(app).put(`/books/1`).send(bookData3);
        expect(res.statusCode).toBe(200);
        console.log(res.body)
        expect(res.body).toEqual({
            book: {
                isbn: '1',
                amazon_url: 'https://www.amazon.com/the_hobbit_2',
                author: 'JRR Tolkien Jr',
                language: 'American',
                pages: 420,
                publisher: "Tokin' House",
                title: 'Here and Here again or The Covid',
                year: 2020
            }
        })
    })
    test('Tries to update an invalid book', async () => {
        const res = await request(app).put(`/companies/0`).send({ name: 'Team Solo Mid Snapdragon', description: 'E-sports Royalty' });
        expect(res.statusCode).toBe(404);

    })

})

describe("DELETE /books/:isbn", () => {
    test('Deletes a single book ', async () => {
        const res = await request(app).delete(`/books/1`)
        expect(res.statusCode).toBe(200);
        console.log(res.body)
        expect(res.body).toEqual({ message: 'Book deleted' })
    })
})