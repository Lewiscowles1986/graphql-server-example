"""Book data for the API."""

import typing
from schema import Book

books: typing.List[Book] = [
    Book(
        title="The Great Gatsby",
        author="F. Scott Fitzgerald",
    ),
]


def get_books() -> typing.List[Book]:
    return books


def add_book(book: Book) -> None:
    books.append(book)


def get_book(id: int) -> Book | None:
    book = None
    try:
        book = books[id]
    except IndexError:
        pass
    return book
