import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { Book, eitherStr } from './schema';

const debugBook = (data: unknown) => 
  pipe(
    data,
    eitherStr(Book),
    E.orElseW(error => E.right({ error })),
    E.map(result => console.dir(result, { depth: null })),
  );

debugBook({
  title: "My First Book",
  year: 2021,
  authors: [{ name: "John Smith", email: "john@smith.com" }],
  coords: [1.2, 23.32]
});
/* Prints:
 Book {
   title: 'My First Book',
   annotation: undefined,
   year: 2021,
   authors: [ Person { name: 'John Smith', email: 'john@smith.com' } ],
   coords: [ 1.2, 23.32 ]
}
 */

debugBook(null);
/* Prints:
 { error: 'Book is expected but "null" received.' }
 */

debugBook({});
/* Prints:
 { error: 'string is expected in title but "undefined" received.' }
 */