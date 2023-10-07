
// The methods you've mentioned (`create`, `find`, `findById`, `findByIdAndUpdate`, and `findByIdAndDelete`) are commonly used Mongoose methods for performing various operations on MongoDB collections. They are used to interact with MongoDB databases when working with Mongoose models, which represent the structure and behavior of documents in a collection. Here's a brief explanation of each method:

// 1. **`create`**: This method is used to create and save a new document (record) in a MongoDB collection. It takes an object as a parameter, which should contain the data you want to insert. For example:

// 2. **`find`**: The `find` method is used to retrieve documents from a MongoDB collection that match a specified query criteria. It returns an array of documents that match the query or an empty array if no documents are found. For example:

// 3. **`findById`**: This method is used to retrieve a single document from a MongoDB collection by its unique identifier (`_id`). It's commonly used when you want to retrieve a specific document based on its ID. For example:

// 4. **`findByIdAndUpdate`**: This method is used to find a document by its ID, update it with new data, and return the updated document. It takes the document's ID and an object with the updates as parameters. For example:

// 5. **`findByIdAndDelete`**: Similar to `findByIdAndUpdate`, this method finds a document by its ID and deletes it from the collection. It also returns the deleted document. For example:

// These Mongoose methods provide a convenient and structured way to perform common CRUD (Create, Read, Update, Delete) operations on MongoDB collections when working with Mongoose models. They abstract away the complexity of interacting with the database and allow you to work with JavaScript objects that map to MongoDB documents.


import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;



