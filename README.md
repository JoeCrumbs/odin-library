# library

> [!NOTE]
> After returning to The Odin Project after a longer break, there may have been some changes in the assignments of the project. Please note that this repository shows my original solution without incorporating these changes.

* Live: [Demo](https://joecrumbs.github.io/library/)

## Assignment Nr.8 ([The Odin Project Library](https://www.theodinproject.com/lessons/node-path-javascript-library))
1. [x] If you haven’t already, set up your project with skeleton HTML/CSS and JS files.
1. [x] All of your book objects are going to be stored in a simple array, so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array. Your code should look something like this:
    ```javascript
    let myLibrary = [];

    function Book() {
    // the constructor...
    }

    function addBookToLibrary() {
    // do stuff here
    }
    ```
1. [x] Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
1. [x] Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want.
1. [x] Add a button on each book’s display to remove the book from the library.
    1. You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
6. [x] Add a button on each book’s display to change its read status.
    1. To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.
1. [x] Optional - we haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page, all of their books will disappear! If you want, you are capable of adding some persistence to this library app using the Web Storage API.
    1. localStorage allows you to save data on the user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a function that saves the whole library array to localStorage every time a new book is created, and another function that looks for that array in localStorage when your app is first loaded. Additionally, here are a couple of quick tips to help you not get tripped up:
        * Make sure your app doesn’t crash if the array you retrieve from localStorage isn’t there!
        * localStorage uses JSON to send and store data, and when you retrieve the data, it will also be in JSON format. You will learn more about this language in a later lesson, but it doesn’t hurt to get your feet wet now. Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods back to your object properties once you fetch them. Good luck!