import { Person, TPerson, Book, TBook } from './schema';

const me = Person({ id: 'd2c61fc4-07cc-4069-bfef-e43bf73c54a3', name: "John Smith", email: "john@smith.com" });

const meAgain: TPerson = {
  id: 'C8A15598-6694-489D-A41C-B38CCFAECBB7',
  name: "John Smith",
  // email: "john.smith@gmail.com", // but email will not be validated with validator.isEmail
};

const myBook = Book({
  // title: "My First Book",
  year: 2002,
  authors: [
    me,
    meAgain,
    { 
      id: '13a8042f-3c3d-498e-ba85-3902c270782b',
      name: 'Some Other Guy',
      email: 'other.guy@gmail.com',
    },
  ],
  // coords: [1.2, 2],
});

const book: TBook = myBook;

console.log(JSON.stringify(book, null, 2));