const Book = require("../model/Book");

const getAllBooks = async (req, res, next) => {
  let books;

  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "Book is not found" });
  } else {
    return res.status(200).json({ books });
  }
};

const getById = async (req, res, next) => {
  let book;
  const id = req.params.id; // This line fetch the id from data base

  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({ message: "Book is not avilable" });
  } else {
    return res.status(200).json({ book });
  }
};
const addBook = async (req, res, next) => {
  const { name, author, description, price, available, image } = req.body;

  let book;

  try {
    book = new Book({
      name,
      author,
      description,
      price,
      available,
      image,
    });

    await book.save(); // save function will save the data in data Base
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unavilable" });
  } else {
    return res.status(201).json({ book });
  }
};

const updateBook = async (req, res, next) => {
  let book;

  const id = req.params.id;
  const { name, author, description, price, available, image } = req.body;

  try {
    book = await Book.findByIdAndUpdate(id, {
      // find the vook by id and update that particular book
      name,
      author,
      description,
      price,
      available,
      image,
    });

    book = await book.save(); // save the updated book in database
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res
      .status(404)
      .json({ message: "Unable to update by this by of the book" });
  } else {
    return res.status(200).json({ book });
  }
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;

  try {
    book = await Book.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({ message: "Unable to delete the book" });
  } else {
    return res.status(200).json({ message: "Book is delete successfully" });
  }
};

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
