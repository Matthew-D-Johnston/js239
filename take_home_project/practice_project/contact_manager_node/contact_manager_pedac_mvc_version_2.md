###### JS239 Assessment: DOM and Asynchronous Programming with JavaScript > Start Assessment JS239

---

# Practice Project

## Problem

Here's a practice project that you can use to prepare for the actual take-home project.  

Implement the Contact Manager app here:  

http://devsaran.github.io/contact-manager-backbone/. 

You should implement all the features there, including the search. Also, implement a "tagging" feature, which allows you to create tags, such as "marketing," "sales," "engineering," and when you add/edit a contact, you can select a tag to attach to the contact. Finally, you can click on a tag and show all the contacts with that tag. The UI isn't too important here since the focus is on the functionality. The other difference between the project in the link and the one you'll develop is that your application will have an API server to store and retrieve contacts.  

#### API Server

You can download the API server [here](https://d3905n0khyu9wc.cloudfront.net/code/contact_manager_node_v2.zip). You must have a node version > 8.0 and `npm` installed to run this server on your computer. To set up the server, unzip the zip file, navigate to the application directory in the terminal, and run the following command:

```
npm install
```

This command will install all the dependencies required to the run the server. You can run the server with the following command:

```
npm start
```

This command will start the server on port 3000. The `root` URL of the application is `http://localhost:3000`. This URL will load the `index.html` file inside the `public` directory of the application. You can link to your JavaScript files and stylesheets in `index.html`. The public directory contains other directories to house your scripts, stylesheets, and images. To see all operations supported by the API, see the documentation at `http://localhost:3000/doc`. Here you'll see all API endpoints listed along with example requests and responses.  

---

## Algorithm

We will split the program into three main components or objects: Model, View, and Controller. The Model object will house all the data and methods for filtering and manipulating the data. The View object will house all the methods for constructing HTML views. The Controller will implement the functionality of the app by leveraging the data from the Model object and the HTML views rendered by the View object.  

Before we take a look at our three main objects, we can think about what our main basic HTML page will look like.  

### Main HTML

This will have three main elements:

* header
  * We will have our main title of "Contact Manager" here
  * This header will be static and persist throughout all user actions
* main
  * This is where all the action will happens; it will be the dynamic part of the page that changes depending on the user's actions
  * We will construct different div elements to populate this main element depending on user actions and the state of our app (i.e. whether there are contacts to display or not)
* Footer
  * This will have some boilerplate about the app being developed by me
  * It will also be static and persist through all user actions

Below will split up the rest of our problem along these three objects:

### 1) Model

The primary data that we will be dealing with is a list of contacts stored on our API server.  Thus we should have an instance variable for the contacts. We might also want an instance variable that simply indicates the current number of contacts.

#### Instance Variables

* `contacts`
  * Array of objects representing the contacts.
  * This variable will be set every time the controller makes a request to the server to request the contact data.
* `numberOfContacts`
  * a number indicating the number of contacts (the length of the `contacts` array)

The Model object should also have some instance methods for filtering the contact data. We will need a filter that collects only the contacts whose names contain a certain substring that is typed by the user.  We will also need a filter that collects only the contacts that have a particular tag as specified by the user. We also want a method that will collect all of the tags from all of the contacts and makes a list without duplicate tags.

#### Instance Methods

* `filterContactsByNameContainingSubstring(substring)`
* `filterContactsByTag(tag)`
* `createTagsList()`



### 2) View

When the user first navigates to the Contact Manager, the initial page displayed will be one that shows the list of contacts (if there are any) or a message indicating there are no contacts (if no contacts are retrieved from the server).  

There will be two main div elements that we will need to construct as container elements. The first will be where we house the functionality of the app for adding contacts, searching the list of contacts based on substrings that match the names of the contacts, and a list of tags that users can click on to filter the contacts based on the value of a tag.  The second will be where we either display the list of contacts or the message indicating that there are no contacts.  

* div (user-actions)
  * Div (add-and-search)
    * Button for adding contacts
    * Input for searching contacts based on a string value
  * Div (tags)
    * paragraph for Tags label
    * unordered list of anchors corresponding to the tags
    * a button to refresh the tag filters
* div (contact-list); this will have two states
  * 1st state: a paragraph with a message indicating there are no contacts
  * 2nd state: an unordered list of contacts
    * this unordered list will need to be constructed dynamically using data from the server
    * it will rely on handlebars templates which will be constructed from scripts embedded in the initial HTML page; these scripts will be used to construct the templates and then removed from the initial HTML page.

Next we need a div, or two divs, corresponding to the Create Contact and Edit Contact forms. These two divs will be very similar and thus we should be able create one view for both but specify unique ids or characteristics for each depending on whether it is a create or edit contact form. However, after constructing the main skeleton of the Edit Contact div we will need to fill out the input fields with a specific contact's data.

* Div (create-or-edit-contact)
  * Form (create-contact / edit-contact)
    * fieldset
      * Unordered list
        * list items
          * Labels for the input fields
          * Input fields for full name, email address, telephone number, and tags
    * button for submitting
    * button for canceling

### 3) Controller

The Controller object will be where we implement all the interactions between the Model object and the View object. It will need instance variables assigned to these two other objects. It will then need a group of instance methods for implementing the interactions and displaying different views to the user based on the user's interaction with the app. It will be where we make our requests to the server to obtain the data.  

#### Instance Variables

* A model variable that stores the Model object
* a view variable that stores the View object

#### Instance Methods

* `retrieveContactData()`
  * Issue an XML HTTP Request using fetch so that it returns a promise
  * `GET` request with url: `http://localhost:3000/api/contacts`
* `updateContact(id, contactData)`
  * `PUT` request with url: `http://localhost:3000/api/contacts/:id`
  * note that we need the contact's id to send this request
  * we also need to send the contact's updated data in the form of a JSON object
* `saveNewContact(contactData)`
  * `POST` request with url: `http://localhost:3000/api/contacts/`
  * we will need the contact data in the form of a JSON object
* `deleteContact(id)`
  * `DELETE` request with url: `http://localhost:3000/api/contacts/:id`
  * we will need the contact's id
* `displayContactsView()`
  * 
* 

---

## Code

### Main HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="stylesheets/contact_manager.css">
  <script src="/javascripts/jquery.js"></script>
  <script src="/javascripts/handlebars.js"></script>
  <script src="/javascripts/contact_manager.js"></script>
</head>
<body>
  <header>
    <h1>Contact Manager</h1>
  </header>
  <main>
  </main>
  <footer>
    <p>Developed by Matt</p>
  </footer>
</body>
</html>
```

