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

  filterContactsById(value) {
    return this.contacts.filter(contact => contact.id === value)[0];
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
    // form.noValidate = true;
    div.appendChild(form);
    
    let fieldset = document.createElement('fieldset');
    form.appendChild(fieldset);
    
    let submitButton = document.createElement('input');
    submitButton.id = `${formType}-submit`;
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

  constructFilledOutEditContactForm(contact) {
    let editContactFormHTML = this.constructContactFormHTML('edit');
    
    let form = editContactFormHTML.querySelector('form');
    form.id = `edit-contact-${contact.id}`;

    let nameInput = editContactFormHTML.querySelector('#name');
    nameInput.value = contact.full_name;
    
    let emailInput = editContactFormHTML.querySelector('#email');
    emailInput.value = contact.email;

    let telephoneInput = editContactFormHTML.querySelector('#telephone');
    telephoneInput.value = contact.phone_number;

    let tagsInput = editContactFormHTML.querySelector('#tags');
    tagsInput.value = contact.tags;

    return editContactFormHTML;
  }
    
  constructContactListTemplate() {
    let script = document.getElementById('contact-list-template');
    let template = Handlebars.compile(script.innerHTML);
    script.remove();
    return template;
  }

  constructTagsListHTML(tags) {
    let ul = document.createElement('ul');

    let p = document.createElement('p');
    p.innerText = "Tags:";
    ul.appendChild(p);

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
    this.displayContactsView(true);
    this.bindEvents();
  }

  bindEvents() {
    this.main.addEventListener('keyup', this.displayNameFilteredContacts.bind(this));
    this.main.addEventListener('click', this.clickEventDelegator.bind(this));
    // this.main.addEventListener('submit', this.formSubmissionDelegator.bind(this));
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
        this.displayContactsView(false);
      }
    }    
  }

  clickEventDelegator(event) {
    event.preventDefault();
    let target = event.target;

    // Routes:
    if (target.tagName === 'A') {
      let tag = target.innerText;
      this.displayTagFilteredContacts(tag);
    }

    if (target.id === 'add-contact') {
      let createContactFormDiv = this.view.constructContactFormHTML('create');
      this.main.innerHTML = "";
      this.main.appendChild(createContactFormDiv);
    }

    if (target.classList.contains('edit')) {
      console.log("I'm an edit button!");
      let contact = this.obtainContactFromEditButton(target);
      this.displayEditContactForm(contact);
    }

    if (target.classList.contains('delete')) {
      if (window.confirm('Are you sure you want to delete this contact?')) {
        let contactID = Number(target.id.match(/\d+/g)[0]);
        this.deleteContact(contactID);
        this.displayContactsView(true);
      }
    }

    if (target.id === 'create-submit') {
      console.log("I'm a create contact submit button!");
      this.addNewContact();
    }

    if (target.id === 'edit-submit') {
      this.editContact();
    }

    if (target.id === 'cancel-contact') {
      this.displayContactsView(false);
    }
  }

  deleteContact(contactID) {
    return fetch(`http://localhost:3000/api/contacts/${contactID}`, {
      method: 'DELETE'
    });
  }

  async editContact() {
    let form = document.querySelector('form');
    let formData = new FormData(form);

    let contactID = Number(form.id.match(/\d+/g)[0]);
    let contactName = formData.get('name');
    let contactEmail = formData.get('email');
    let contactTelephone = formData.get('telephone');
    let contactTags = formData.get('tags');

    let contact = {
      id: contactID,
      full_name: contactName,
      email: contactEmail,
      phone_number: contactTelephone,
      tags: contactTags
    }

    await this.updateContact(contactID, contact);
    this.displayContactsView(true);
  }

  async addNewContact() {
    let form = document.querySelector('form');
    let formData = new FormData(form);

    let contactName = formData.get('name');
    let contactEmail = formData.get('email');
    let contactTelephone = formData.get('telephone');
    let contactTags = formData.get('tags');

    let contact = {
      full_name: contactName,
      email: contactEmail,
      phone_number: contactTelephone,
      tags: contactTags
    }

    await this.saveContact(contact);
    this.displayContactsView(true);
  }

  updateContact(id, contact) {
    let json = JSON.stringify(contact);
    return fetch(`http://localhost:3000/api/contacts/${id}`, {
      method: 'PUT',
      headers: [['Content-Type', 'application/json']],
      body: json
    });
  }

  saveContact(contact) {
    let json = JSON.stringify(contact);
    return fetch('http://localhost:3000/api/contacts/', {
      method: 'POST',
      headers: [['Content-Type', 'application/json']],
      body: json
    });
  }

  obtainContactFromEditButton(target) {
    let buttonID = target.id;
    let contactID = Number(buttonID.match(/\d+/g)[0]);
    let contact = this.model.filterContactsById(contactID);
    return contact;
  }

  displayEditContactForm(contact) {
    let editContactFormHTML = this.view.constructFilledOutEditContactForm(contact);
    this.main.innerHTML = '';
    this.main.appendChild(editContactFormHTML);
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

  async displayContactsView(fetchDataFromServer) {
    if (fetchDataFromServer) {
      await this.fetchContactListFromServer('http://localhost:3000/api/contacts');
    }

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
});
