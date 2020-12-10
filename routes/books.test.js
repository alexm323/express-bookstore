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

let testBook;
// What we want to do before we test is create a variable where we will be storing the data that we get back and that will just make the testing easier. 
beforeEach(async () => {
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

describe("GET /books/:code", () => {
    test('Get a single company', async () => {
        const res = await request(app).get(`/companies/${testCompany.code}`)
        expect(res.statusCode).toBe(200);
        expect(res.body.company.name).toEqual('Team Solo Mid')
    })
    test('Responds with 404 for invalid id', async () => {
        const res = await request(app).get(`/companies/0`)
        expect(res.statusCode).toBe(404);
    })
})
// describe("post /companies", () => {
//     test('Create a single company ', async () => {
//         const res = await request(app).post('/companies').send({ code: 'myspace', name: 'Myspace', description: 'Social Media Company' });
//         expect(res.statusCode).toBe(201);
//         expect(res.body).toEqual({
//             company: { code: "myspace", name: 'Myspace', description: 'Social Media Company' }
//         })
//     })
// })

// describe("PUT /companies/:code", () => {
//     test('Updates a single company ', async () => {
//         const res = await request(app).put(`/companies/${testCompany.code}`).send({ name: 'Team Solo Mid Snapdragon', description: 'E-sports Royalty' });
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toEqual({
//             company: { code: testCompany.code, name: 'Team Solo Mid Snapdragon', description: 'E-sports Royalty' }
//         })
//     })
//     test('Tries to update an invalid company', async () => {
//         const res = await request(app).patch(`/companies/0`).send({ name: 'Team Solo Mid Snapdragon', description: 'E-sports Royalty' });
//         expect(res.statusCode).toBe(404);

//     })

// })

// describe("DELETE /companies/:code", () => {
//     test('Deletes a single company ', async () => {
//         const res = await request(app).delete(`/companies/${testCompany.code}`)
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toEqual({ status: 'Deleted' })
//     })
// })