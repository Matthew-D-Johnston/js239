"use strict";

class Model {
  constructor() {
    this.contacts = [];
    this.numberOfContacts = 0;
  }
  
  filterContactsByNamesStartingWith(value) {
    let regex = new RegExp(`^${value}`, 'gi');
    
    return this.contacts.filter(contact => contact.full_name.match(regex));
  }
  
  filterContactsByTag(value) {
    let regex = new RegExp(`${value}`, 'gi');
    
    return this.contacts.filter(contact => {
      if (contact.tags) {
        return contact.tags.match(regex);
      }   
    });
  }
  
  retrieveContactTags() {
    let filteredTags = [];
    
    this.contacts.forEach(contact => {
      let tags = contact.tags;
      if (tags) {
        let tagsArray = tags.split(',');
      
        tagsArray.forEach(tag => {
          let formattedTag = tag.toLowerCase();
          if (!filteredTags.includes(formattedTag)) {
            filteredTags.push(formattedTag);
          }
        });
      }
    });
    
    return filteredTags;
  }
}

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
    
    let tagsDiv = document.createElement('div');
    tagsDiv.id = 'contact-tags'
    
    div.appendChild(button);
    div.appendChild(input);
    div.appendChild(tagsDiv);
    
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
    submitButton.id = 'submit-contact';
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

  constructTagsListHTML(tags) {
    let ul = document.createElement('ul');

    tags.forEach(tag => {
      let li = document.createElement('li');
      let anchor = document.createElement('a');
      anchor.setAttribute('href', '#');
      anchor.innerText = tag;
      li.appendChild(anchor);
      ul.appendChild(li);
    })

    return ul;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.main = document.querySelector('main');
    this.displayContactsView();
    this.bindEvents();
  }

  bindEvents() {
    this.main.addEventListener('keyup', this.displayNameFilteredContacts.bind(this));
    this.main.addEventListener('click', this.clickEventDelegator.bind(this));
  }
  
  fetchContactListFromServer(url) {
    return fetch(url, {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      this.model.contacts = data;
      this.model.numberOfContacts = data.length;
    })
  }

  displayNameFilteredContacts(event) {
    let searchField = document.getElementById('search');

    if (event.target === searchField) {
      let firstLetters = searchField.value;

      if (firstLetters.length > 0) {
        let filteredContacts = this.model.filterContactsByNamesStartingWith(firstLetters);
        let contactListDiv = document.querySelector('.contact-list');

        if (filteredContacts.length > 0) {
          let filteredContactsHTML = this.view.contactListTemplate({ contacts: filteredContacts });
          contactListDiv.innerHTML = filteredContactsHTML;
        } else {
          console.log('no contacts starting with');
          this.displayMessageForNoContactsStartingWith(firstLetters, contactListDiv);
        }
      } else {
        this.displayContactsView();
      }
    }    
  }

  clickEventDelegator(event) {
    let target = event.target;
    // console.log(event.target.tagName);

    // Routes:
    if (target.tagName === 'A') {
      let tag = target.innerText;
      this.displayTagFilteredContacts(tag);
    }

    if (target.id === 'add-contact') {
      console.log("I'm an Add Contact button!");
    }

    if (target.classList.contains('edit')) {
      console.log("I'm an edit button!");
    }

    if (target.classList.contains('delete')) {
      console.log("I'm a delete button!");
    }

    if (target.id === 'submit-contact') {
      console.log("I'm a submit contact button!");
    }

    if (target.id === 'cancel-contact') {
      console.log("I'm a cancel contact button!");
    }
  }

  displayMessageForNoContactsStartingWith(value, contactListDiv) {
    let message = document.createElement('p');
    message.innerText = `There are no contacts starting with ${value}.`;
    contactListDiv.innerHTML = "";
    contactListDiv.appendChild(message);
  }

  displayTagFilteredContacts(tag) {
    let filteredContacts = this.model.filterContactsByTag(tag);
    let filteredContactsHTML = this.view.contactListTemplate({ contacts: filteredContacts });
    let contactListDiv = document.querySelector('.contact-list');
    contactListDiv.innerHTML = filteredContactsHTML;
  }

  displayContactListHTML() {
    this.main.innerHTML = "";
    let contactListHTML = this.view.constructContactListHTML();
    let contactListDiv = contactListHTML.querySelector('.contact-list');
    contactListDiv.innerHTML = this.view.contactListTemplate({ contacts: this.model.contacts });
    this.main.appendChild(contactListHTML);
  }

  displayNoContactListHTML() {
    this.main.innerHTML = "";
    let noContactListHTML = this.view.constructNoContactListHTML();
    this.main.appendChild(noContactListHTML);
  }

  displayTagsListHTML() {
    let tagsDiv = document.getElementById('contact-tags');
    let tags = this.model.retrieveContactTags();
    let ul = this.view.constructTagsListHTML(tags);
    tagsDiv.appendChild(ul);
  }

  async displayContactsView() {
    await this.fetchContactListFromServer('http://localhost:3000/api/contacts');

    if (this.model.numberOfContacts > 0) {
      this.displayContactListHTML();
      this.displayTagsListHTML();
    } else {
      this.displayNoContactListHTML();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let contactManagerApp = new Controller(new Model(), new View());
  // contactManagerApp.displayContactsView()
  console.log(contactManagerApp.model);
});