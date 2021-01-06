import { Person, TPerson, Book, TBook } from './schema';

const me = Person({ name: "John Smith", email: "john@smith.com" });

const meAgain: TPerson = {
  name: "John Smith",
  email: "john.smith@gmail.com", // but email will not be validated with validator.isEmail
};

const myBook = Book({
  title: "My First Book",
  year: 2021,
  authors: [
    me,
    meAgain,
    { name: 'Some Other Guy', email: 'other.guy@gmail.com' },
  ],
  coords: [1.2, 23.32]
}, "myBook");

const book: TBook = myBook;

console.log(JSON.stringify(book, null, 2));