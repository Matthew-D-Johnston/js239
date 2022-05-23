# Contact Manager (MVC Model)

## Problem

Implement the Contact Manager app here:

http://devsaran.github.io/contact-manager-backbone/

You should implement all the **features** there, including the search. Also, implement a "tagging" feature, which allows you to create tags, such as "marketing," "sales," "engineering," and when you add/edit a contact, you can select a tag to attach to the contact. Finally, you can click on a tag and show all the contacts with that tag. The UI isn't too important here since the focus is on the functionality. The other difference between the project in the link and the one you'll develop is that your application will have an API server to store and retrieve contacts.

### Dissecting the Problem

We will use the model-view-controller (MVC) method to tackle this problem.

* Model—manages the data of the application
* View—a visual representation of the model
* Controller—links the user and the system

### Model

The model will be where the data of the application are stored. The main concern here is the list of contacts stored on the server. It might also be convenient to have a variable where the total number of contacts is stored.

### View

This will be the visual representation of the data. There are four main visualization concerns that we need to think about aside from the main HTML that will always be displayed. Let's just briefly discuss the main HTML that will be constant on our app no matter what else is going on.

#### Main HTML

The main HTML should have a header with a title and a footer just indicating that the app was developed by me.

#### Other Visualizations

The other visualizations are:

* The list of contacts with an add contact button and search field, including searchable tags links; each contact should have displayed their full name, phone number, email address, and tags; there should also be an edit and delete button.
* A "there are no contacts" message when there are no contacts, which will also have the add contact button and search field, but there will be no tag links.
* A form for adding a new contact with submit and cancel buttons; there should be an input field for the full name, email address, telephone number, and tags.
* A form for editing a contact that when displayed, all of the contact's information is already in the appropriate form fields; the user can then edit whichever input field they like; it will also have submit and cancel buttons. 

### Controller

This will be where the interaction between the Model and the View takes place. It will depend on different events that take place. It will be where we add event listeners and make requests to the server to create, retrieve, update, or delete (CRUD) data.  

Here is a list of some of the functionality of the Controller:

* On the initial page load, the Controller will need to either display a list of contacts or a message saying that there are no contacts depending on whether or not there are contacts; this means it will need to update the Model with the contacts by making a request to the server and then displaying the right visualation from the View depending on whether or not there are contacts.
* When the Add Contact button is pressed, the Controller should display the create contact form produced by the View. It should hide the contact list/"there are no contacts" message as well as the add contact button and search field.
* Once a user inputs data in the Create Contact form and hits submit, the Controller should update the server with the new contact information. The create contact page should disappear and the updated list of contacts should appear.
* If the user hits the Cancel button, then it should revert back to the contact list/"there are no contacts" message with the Add Contact button and search field.
* If the user clicks on an Edit button for a particular user, then it should bring up the Edit Contact form. It should hide the contact list/"there are no contacts" message as well as the add contact button and search field.
* If the user hits the submit button for the Edit Contact form, the Controller should send a request to the server to update the particular contact. The contact list should then reappear with the updated information for the particular contact. 
* If the Cancel button is hit for the Edit Contact form, then the Controller should revert back to displaying the contact list with no other changes.
* When the user types letters into the search field, the Controller should compare the value in the input field with the names of the existing contacts. It should then create a list of just those contacts whose names start with the value in the input field and should display only those names in the contact list. If there are no names that start with the given values, then a message should be displayed indicating that "There are no contacts starting with [letter(s)]".
* When a user clicks on one of the tag links, the Controller should search the contact list for contacts that have the particular tag and display only those contacts.

---

## Examples / Test Cases







---

## Data Structure







---

## Algorithm

### Model



### View

There are two visualizations that both need a section where there is an Add Contact button and a Search input field. Let's have a method that creates that element.

`constructAddContactAndSearchHTML`

* We will wrap this in a `div` element with a class of `add-and-search-contacts`.
* Within the `div` element we will have a `button` element with class `add-contact` and has inner text content of `Add Contact`. Maybe also an id of `add-contact`.
* We will also have an `input` element of type `text`, class of `search`, id of `search`, and placeholder value of `search`.
* We will create a method that returns the `div` element that contains both the `button` and `input` elements.

Here is a model of what we want to create with the method:

```html
<div class="add-and-search-contacts">
  <button id="add-contact" class="add-contact">Add Contact</button>
  <input type="text" id="search" class="search" placeholder="Search">
</div>
```

#### 1) List of Contacts

For the list of contacts we will need to include the above div that includes the Add Contact button and Search input.  

This part of the visualization will also be used to display data from the Model object. The Model object will have a list of contacts (an array containing individual object elements representing each contact).  We will create a handlebars `script` template that is part of the main page. We will then retrieve this `script` template, remove it from the main HTML, and create a handlebars template function.  

Here is an outline of what the `script` will look like:

```html
<script id="contact-list-template" type="text/x-handlebars">
  <ul>
  {{#each contacts}}
    <li id="contact-{{id}}">
      <h3>{{full_name}}</h3>
      <dl>
        <dt>Phone Number:</dt>
        <dd>{{phone_number}}</dd>
        <dt>Email:</dt>
        <dd>{{email}}</dd>
        <dt>Tags:</dt>
        <dd>{{tags}}</dd>
      </dl>
      <button class="edit" id="edit-{{id}}">Edit</button>
      <button class="delete" id="delete-{{id}}">Delete</button>
    </li>
  {{/each}}
  </ul>
</script>
```

Thus, we need a method in the View object that will retrieve this script and create a handlebars template with it.  

`createContactListTemplate`

* retreive contact list template script
* compile the script to create a handlebars template function
* return the function
* Create a variable within the view that represents the function.

#### 2) There are no contacts

This is fairly straightforward. The method will be `constructNoContactListHTML`.  

#### 3) Create/Edit Contact Form

We need to create a `constructContactFormHTML` method that will be used to create both the Create Contact Form and the Edit Contact Form. This method will rely on another method for creating `li` elements with certain specifications. We will call this method, `constructLiElement`.  

The `constructLiElement` will take the following arguments:

* `for`
* `type`
* `id`
* `name`
* `textContent`

It will create and return an `li` element with `label` and `input` elements as children.  

We will use the return value of this method to help create the `constructContactHTML` method. This method will take one argument, a string value of either `create` or `edit` corresponding to either a create contact form or an edit contact form.



### Controller





---

## Code

### Main HTML

```index.html```

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
    <script id="contact-list-template" type="text/x-handlebars">
      <ul>
      {{#each contacts}}
        <li id="contact-{{id}}">
          <h3>{{full_name}}</h3>
          <dl>
            <dt>Phone Number:</dt>
            <dd>{{phone_number}}</dd>
            <dt>Email:</dt>
            <dd>{{email}}</dd>
            <dt>Tags:</dt>
            <dd>{{tags}}</dd>
          </dl>
          <button class="edit" id="edit-{{id}}">Edit</button>
          <button class="delete" id="delete-{{id}}">Delete</button>
        </li>
      {{/each}}
      </ul>
    </script>
  </main>
  <footer>
    <p>Developed by Matt</p>
  </footer>
</body>
</html>
```

### HTML Representations of View Visualizations

#### 1) List of Contacts

* Add Contact Button
* Search Field
* Contact List

```html
<div "contacts">
  <div class="add-and-search-contacts">
    <button id="add-contact" class="add-contact">Add Contact</button>
    <input type="text" id="search" class="search" placeholder="Search">
  </div>
  <div class="contact-list">    
  </div>
</div>
```

#### 2) There are no contacts

* Add Contact Button
* Search Field
* "There are no contacts" message

```html
<div "no-contacts">
  <div class="add-and-search-contacts">
    <button id="add-contact" class="add-contact">Add Contact</button>
    <input type="text" id="search" class="search" placeholder="Search">
  </div> 
  <div class="no-contact-list">
    <p>There are no contacts.</p>
  </div>
</div>
```

#### 3) Create Contact Form

* Full Name input
* Email address input
* Telephone number input
* Tags input
* Submit button
* Cancel button

```html
<div class="create-contact">
  <h2>Create Contact</h2>
  <form id="create-contact">
    <fieldset>
      <ul>
        <li>
          <label for="name">Full name:</label>
          <input type="text" id="name" name="name">
        </li>
        <li>
          <label for="email">Email address:</label>
          <input type="email" id="email" name="email">
        </li>
        <li>
          <label for="telephone">Telephone number:</label>
          <input type="text" id="telephone" name="telephone">
        </li>
        <li>
          <label for="tags">Tags:</label>
          <input type="text" id="tags" name="tags">
        </li>
      </ul>
    </fieldset>
    <input type="submit" value="Submit">
    <button>Cancel</button>
  </form>
</div>
```

#### 4) Edit Contact Form

* Full Name input (filled out)
* Email address input (filled out)
* Telephone number input (filled out)
* Tags input (filled out)
* Submit button
* Cancel button

```html
<div class="edit-contact">
  <h2>Create Contact</h2>
  <form id="edit-contact">
    <fieldset>
      <ul>
        <li>
          <label for="name">Full name:</label>
          <input type="text" id="name" name="name">
        </li>
        <li>
          <label for="email">Email address:</label>
          <input type="email" id="email" name="email">
        </li>
        <li>
          <label for="telephone">Telephone number:</label>
          <input type="text" id="telephone" name="telephone">
        </li>
        <li>
          <label for="tags">Tags:</label>
          <input type="text" id="tags" name="tags">
        </li>
      </ul>
    </fieldset>
    <input type="submit" value="Submit">
    <button>Cancel</button>
  </form>
</div>
```







### Model

```javascript
class Model {
  constructor() {
    this.contacts;
    this.numberOfContacts;
  }
  
  filterContacts(value) {
    
  }
}
```



### View

```javascript
class View {
  constructor() {
    this.main = document.querySelector('main');
    this.contactListTemplate = this.constructContactListTemplate();
    this.contactListHTML = this.constructContactListHTML();
    this.noContactListHTML = this.constructNoContactListHTML();
  }
  
  constructAddContactAndSearchHTML() {
    let div = document.createElement('div');
    div.className = "add-and-search-contacts";
    
    let button = document.createElement('button');
    button.id = "add-contact";
    button.className = "add-contact";
    button.innerText = "Add Contact";
    
    let input = document.createElement('input');
    input.id = "search";
    input.className = "search";
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Search');
    
    div.appendChild(button);
    div.appendChild(input);
    
    return div;
  }
  
  constructContactListHTML() {
    let outerDiv = document.createElement('div');
    outerDiv.className = "contacts";
    
    let innerDiv1 = this.constructAddContactAndSearchHTML();
    outerDiv.appendChild(innerDiv1);
    
    let innerDiv2 = document.createElement('div');
    innerDiv2.className = "contact-list";
    outerDiv.appendChild(innerDiv2);
    
    return outerDiv;
  }
  
  constructNoContactListHTML() {
    let outerDiv = document.createElement('div');
    outerDiv.className = "no-contacts";
    
    let innerDiv1 = this.constructAddContactAndSearchHTML();
    outerDiv.appendChild(innerDiv1);
    
    let innerDiv2 = document.createElement('div');
    innerDiv2.className = "no-contact-list";
    outerDiv.appendChild(innerDiv2);
    
    let p = document.createElement('p');
    p.innerText = "There are no contacts.";
    innerDiv2.appendChild(p);
    
    return outerDiv;
  }
  
  constructLiElement(labelFor, type, id, name, textContent) {
    let li = document.createElement('li');
    
    let label = document.createElement('label');
    label.innerText = textContent;
    label.setAttribute('for', labelFor);
    
    let input = document.createElement('input');
    input.setAttribute('type', type);
    input.id = id;
    input.name = name;
    
    li.appendChild(label);
    li.appendChild(input);
    
    return li;
  }
  
  constructContactFormHTML(formType) {
    let div = document.createElement('div');
    div.className = `${formType}-contact`;
    
    let h2 = document.createElement('h2');
    h2.innerText = formType[0].toUpperCase() + formType.slice(1) + ' ' + 'Contact';
    div.appendChild(h2);
    
    let form = document.createElement('form');
    form.id = `${formType}-contact`;
    div.appendChild(form);
    
    let fieldset = document.createElement('fieldset');
    form.appendChild(fieldset);
    
    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.value = 'Submit';
    form.appendChild(submitButton);
    
    let cancelButton = document.createElement('button');
    cancelButton.id = 'cancel-contact';
    cancelButton.innerText = 'Cancel';
    form.appendChild(cancelButton);
    
    let ul = document.createElement('ul');
    fieldset.appendChild(ul);
    
    let nameLi = this.constructLiElement('name', 'text', 'name', 'name', 'Full name:');
    let emailLi = this.constructLiElement('email', 'email', 'email', 'email', 'Email address:');
    let telephoneLi = this.constructLiElement('telephone', 'text', 'telephone', 'telephone', 'Telephone number:');
    let tagsLi = this.constructLiElement('tags', 'text', 'tags', 'tags', 'Tags:');
    
    ul.appendChild(nameLi);
    ul.appendChild(emailLi);
    ul.appendChild(telephoneLi);
    ul.appendChild(tagsLi);
    
    return div;
  }
    
  constructContactListTemplate() {
    let script = document.getElementById('contact-list-template');
    let template = Handlebars.compile(script.innerHTML);
    script.remove();
    return template;
  }
}
```







### Controller

```javascript
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

// let app = new Controller(new Model(), new View());
```



