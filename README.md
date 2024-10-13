# Book Collection App

## Overview

The Book Collection App is a web application that allows users to search for books using the Google Books API, view details about selected books, and manage a personal collection of books. Users can add books to their collection, view their collection, and delete books as needed.

## Features

- **Search for Books**: Users can search for books using keywords, and the app fetches results from the Google Books API.
- **View Book Details**: Users can view detailed information about a selected book, including a link to the Google Books webpage.
- **Manage Book Collection**: Users can add books to their personal collection, view their collection, and delete books from it.

## Technologies Used

- **Node.js**: The server-side runtime environment.
- **Express**: A web application framework for Node.js.
- **Axios**: A promise-based HTTP client for making requests to the Google Books API.
- **PostgreSQL**: A relational database for storing user collections.
- **EJS**: A templating engine for rendering HTML views.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/book-collection-app.git
   cd book-collection-app
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Set up your PostgreSQL database:
   - Create a database named `collections` (Look into 'queries.sql' for reference).
   - Update the database connection details in `index.js` as needed.

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Home Page**: Users can enter search terms to find books.
- **Search Results**: Displays a list of books matching the search criteria.
- **View Book**: Clicking on a book will show more details and a link to the Google Books page.
- **Add to Collection**: Users can add books to their collection from the search results.
- **View Collection**: Users can view all books in their collection.
- **Delete Book**: Users can remove books from their collection.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## Acknowledgments

- [Google Books API](https://developers.google.com/books/docs/v1/getting-started)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [PostgreSQL](https://www.postgresql.org/)
