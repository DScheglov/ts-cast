# ts-cast: Basics (example)

## Install and Start

```sh
git clone https://github.com/DScheglov/ts-cast.git
cd ts-cast/examples/basics
npm install
npm start
```

**Output**

```shell
Book {
  title: 'My First Book',
  annotation: undefined,
  year: 2021,
  authors: [
    Person { name: 'John Smith', email: 'john@smith.com' },
    Person { name: 'John Smith', email: 'john.smith@gmail.com' },
    Person { name: 'Some Other Guy', email: 'other.guy@gmail.com' }
  ],
  coords: [ 1.2, 23.32 ]
}
```