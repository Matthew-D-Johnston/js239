"use strict";

class Model {
  constructor() {
    this.contacts = [];
    this.numberOfContacts = 0;
  }

  retrieveContact(contactID) {
    return this.contacts.filter(contact => contact.id === contactID)[0];
  }

  filterContactsByNamesContaining(text) {
    let regex = new RegExp(text, 'gi');

    return this.contacts.filter(contact => {
      return !!contact.full_name.match(regex);
    });
  }

  filterContactsByTag(tag) {
    let regex = new RegExp(tag, 'gi');

    return this.contacts.filter(contact => {
      if (contact.tags) {
        return !!contact.tags.match(regex);
      }
    });
  }

  createTagsList() {
    let tagList = [];

    this.contacts.forEach(contact => {
      if (contact.tags) {
        let tags = contact.tags.split(',');

        tags.forEach(tag => {
          if (!tagList.includes(tag)) {
            tagList.push(tag);
          }
        });
      }
    });

    return tagList;
  }
}

class View {
  constructor() {
    this.contactsListTemplate = this.constructContactsListTemplate();
    this.contactTemplate = this.constructContactTemplate();
  }

  constructContactsListTemplate() {
    let contactsListTemplateScript = document.getElementById('contactsList');
    let contactsListTemplate = Handlebars.compile(contactsListTemplateScript.innerHTML);
    return contactsListTemplate;
  }

  constructContactTemplate() {
    let contactTemplateScript = document.getElementById('contactTemplate');
    let contactTemplate = Handlebars.compile(contactTemplateScript.innerHTML);
    Handlebars.registerPartial('contactTemplate', contactTemplateScript.innerHTML);
    return contactTemplate;
  }

  constructContactListDiv(contactsExist, contacts) {
    let div = document.createElement('div');
    div.id = 'contact-list';

    if (contactsExist) {
      let ul = document.createElement('ul');
      ul.innerHTML = this.contactsListTemplate({ contacts: contacts });
      div.appendChild(ul);
    } else {
      let p = document.createElement('p');
      p.innerText = 'There are no contacts.';
      div.appendChild(p);
    }

    return div;
  }

  constructUserActionsDiv(tagsExist) {
    let userActionsDiv = document.createElement('div');
    userActionsDiv.id = 'user-actions';

    let addAndSearchDiv = this.constructAddAndSearchDiv();
    userActionsDiv.appendChild(addAndSearchDiv);

    if (tagsExist) {
      let tagsDiv = this.constructTagsDiv();
      userActionsDiv.appendChild(tagsDiv);
    }

    return userActionsDiv;
  }

  constructAddAndSearchDiv() {
    let addAndSearchDiv = document.createElement('div');
    addAndSearchDiv.id = 'add-and-search';

    let button = document.createElement('button');
    button.id = 'add-contact';
    button.innerText = 'Add Contact';

    let input = document.createElement('input');
    input.id = 'search-contacts';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Search');

    addAndSearchDiv.appendChild(button);
    addAndSearchDiv.appendChild(input);

    return addAndSearchDiv;
  }

  constructTagsDiv() {
    let tagsDiv = document.createElement('div');
    tagsDiv.id = 'tags';

    let p = document.createElement('p');
    p.innerText = 'Tags:';

    let ul = document.createElement('ul');
    ul.id = 'tags-list';

    let button = document.createElement('button');
    button.id = 'refresh-tag-filter'
    button.innerText = 'Refresh Tag Filter';

    tagsDiv.appendChild(p);
    tagsDiv.appendChild(ul);
    tagsDiv.appendChild(button);

    return tagsDiv;
  }

  constructCreateOrEditContactDiv(formType) {
    let div = document.createElement('div');
    div.id = `${formType}-contact`;

    let h2 = document.createElement('h2');
    h2.innerText = formType[0].toUpperCase() + formType.slice(1) + ' ' + 'Contact';
    div.appendChild(h2);

    let form = document.createElement('form');
    form.id = `${formType}-contact-form`;
    form.noValidate = true;
    div.appendChild(form);

    let fieldset = document.createElement('fieldset');
    form.appendChild(fieldset);

    let submitButton = document.createElement('button');
    submitButton.id = `${formType}-contact-submit`;
    submitButton.innerText = 'Submit';
    form.appendChild(submitButton);

    let cancelButton = document.createElement('button');
    cancelButton.id = `${formType}-contact-cancel`;
    cancelButton.innerText = 'Cancel';
    form.appendChild(cancelButton);

    let ul = document.createElement('ul');
    ul.appendChild(this.constructListElement('text', 'name', 'name', 'Full Name:'));
    ul.appendChild(this.constructListElement('email', 'email', 'email', 'Email address:'));
    ul.appendChild(this.constructListElement('text', 'phone', 'phone', 'Telephone number'));
    ul.appendChild(this.constructListElement('text', 'tags', 'tags', 'Tags:'));
    fieldset.appendChild(ul);

    return div;
  }

  constructListElement(type, name, id, textContent) {
    let li = document.createElement('li');

    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = textContent;

    let input = document.createElement('input');
    input.id = id;
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    if (id === 'name') { input.required = true };

    li.appendChild(label);
    li.appendChild(input);
    
    return li;
  }
}


class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.main = document.querySelector('main');
    this.displayUserActionsAndContactListView(true);
    this.bindEvents();
  }

  bindEvents() {
    this.main.addEventListener('keyup', this.displayNameFilteredContactsView.bind(this));
    this.main.addEventListener('click', this.clickEventDelegator.bind(this));
  }

  clickEventDelegator(event) {
    event.preventDefault();
    let target = event.target;

    if (target.id === "add-contact") {
      this.displayCreateContactView();
    }

    if (target.id === "create-contact-submit") {
      if (this.validNameInputField()) {
        this.createNewContact();
        this.main.innerHTML = "";
        this.displayUserActionsAndContactListView(true);
      } else {
        alert("You must enter a full name for the contact.");
      }
    }

    if (target.id === "edit-contact-submit") {
      if (this.validNameInputField()) {
        this.editContact();
        this.main.innerHTML = "";
        this.displayUserActionsAndContactListView(true);
      } else {
        alert("There must be a full name for the contact.");
      }
    }

    if (target.id === "create-contact-cancel" || target.id === "edit-contact-cancel") {
      this.main.innerHTML = "";
      this.displayUserActionsAndContactListView(false);
    }

    if (target.id === "refresh-tag-filter") {
      this.main.innerHTML = "";
      this.displayUserActionsAndContactListView(false);
    }

    if (target.className === "edit") {
      let contactID = Number(target.id.match(/\d+/g)[0]);
      
      this.displayEditContactView(contactID);
    }

    if (target.className === "delete") {
      if (window.confirm("Do you really want to delete this contact?")) {
        let contactID = target.id.match(/\d+/g)[0];
        this.deleteContact(contactID);
        this.main.innerHTML = "";
        this.displayUserActionsAndContactListView(true);
      }
    }

    if (target.tagName === "A") {
      let tag = target.innerText;
      this.displayTagFilteredContactsView(tag);
    }
  }

  validNameInputField() {
    let nameInput = document.getElementById('name');
    return nameInput.checkValidity();
  }

  createNewContact() {
    let form = document.querySelector('form');
    let formData = new FormData(form);
    
    let contact = {
      full_name: formData.get('name'),
      email: formData.get('email'),
      phone_number: formData.get('phone'),
      tags: this.removeDuplicateTags(formData.get('tags'))
    }
    
    this.saveNewContact(contact);
  }

  editContact() {
    let form = document.querySelector('form');
    let formData = new FormData(form);
    
    let contactID = Number(form.id.match(/\d+/g)[0]);

    let contact = {
      id: contactID,
      full_name: formData.get('name'),
      email: formData.get('email'),
      phone_number: formData.get('phone'),
      tags: this.removeDuplicateTags(formData.get('tags'))
    }

    console.log(contact);
    this.updateContactData(contactID, contact);
  }

  removeDuplicateTags(tags) {
    let tagsArray = tags.split(',');
    let nonDuplicateTags = [];

    tagsArray.forEach(tag => {
      if (!nonDuplicateTags.includes(tag)) {
        nonDuplicateTags.push(tag);
      }
    });

    return nonDuplicateTags.join(',');
  }

  retrieveContactData() {
    return fetch('http://localhost:3000/api/contacts', {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      this.model.contacts = data;
      this.model.numberOfContacts = data.length;
    })
  }

  updateContactData(contactID, contactData) {
    let jsonData = JSON.stringify(contactData);

    return fetch(`http://localhost:3000/api/contacts/${contactID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    });
  }

  saveNewContact(contactData) {
    let jsonData = JSON.stringify(contactData);

    return fetch(`http://localhost:3000/api/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    });
  }

  deleteContact(contactID) {
    return fetch(`http://localhost:3000/api/contacts/${contactID}`, {
      method: 'DELETE'
    });
  }

  async displayUserActionsAndContactListView(retrieveDataFromServer) {
    if (retrieveDataFromServer) {
      await this.retrieveContactData();
    }

    this.displayUserActionsDiv();
    this.displayContactListDiv();
  }

  displayUserActionsDiv() {
    let tags = this.model.createTagsList();
    let userActionsDiv;

    if (tags.length > 0) {
      userActionsDiv = this.view.constructUserActionsDiv(true);
      let tagsList = userActionsDiv.querySelector('#tags-list');

      tags.forEach(tag => {
        let li = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.setAttribute('href', '#');
        anchor.innerText = tag;
        li.appendChild(anchor);
        tagsList.appendChild(li);
      })
    } else {
      userActionsDiv = this.view.constructUserActionsDiv(false);
    }

    this.main.appendChild(userActionsDiv);
  }

  displayContactListDiv() {
    let contacts = this.model.contacts;
    let contactListDiv;

    if (contacts.length > 0) {
      contactListDiv = this.view.constructContactListDiv(true, contacts);
    } else {
      contactListDiv = this.view.constructContactListDiv(false);
    }

    this.main.appendChild(contactListDiv);
  }

  displayNameFilteredContactsView(event) {
    let target = event.target;
    let searchField = document.getElementById('search-contacts');

    if (target === searchField) {
      let filteredContacts = this.model.filterContactsByNamesContaining(searchField.value);
      let contactListDiv = document.getElementById('contact-list');
      let filteredContactListDiv;

      if (filteredContacts.length > 0) {
        filteredContactListDiv = this.view.constructContactListDiv(true, filteredContacts);
      } else {
        filteredContactListDiv = this.view.constructContactListDiv(false);
        let p = filteredContactListDiv.querySelector('p');
        p.innerText = `There are no contacts containing "${searchField.value}" in their name.`;
      }

      contactListDiv.parentElement.replaceChild(filteredContactListDiv, contactListDiv);
    }
  }

  displayTagFilteredContactsView(tag) {
    let filteredContacts = this.model.filterContactsByTag(tag);
    let filteredContactListDiv = this.view.constructContactListDiv(true, filteredContacts);
    let contactListDiv = document.getElementById('contact-list');
    contactListDiv.parentElement.replaceChild(filteredContactListDiv, contactListDiv);
    console.log(filteredContactListDiv);
  }

  displayCreateContactView() {
    this.main.innerHTML = "";
    this.main.appendChild(this.view.constructCreateOrEditContactDiv('create'));
  }

  displayEditContactView(contactID) {
    let editContactDiv = this.view.constructCreateOrEditContactDiv('edit');
    
    let form = editContactDiv.querySelector('form');
    form.id = `edit-contact-form-${contactID}`;

    let contact = this.model.retrieveContact(contactID);
    editContactDiv.querySelector('#name').value = contact.full_name;
    editContactDiv.querySelector('#email').value = contact.email;
    editContactDiv.querySelector('#phone').value = contact.phone_number;
    editContactDiv.querySelector('#tags').value = contact.tags;
    
    this.main.innerHTML = "";
    this.main.appendChild(editContactDiv);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  let contact_manager = new Controller(new Model(), new View());
})
