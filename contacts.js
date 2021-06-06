const shortid = require("shortid");

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      return console.log(
        JSON.parse(data).find(({ id }) => id === Number(contactId))
      );
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data).filter(
        ({ id }) => id !== Number(contactId)
      );
      const contactsList = JSON.stringify(contacts, null, "\t");
      fs.writeFile(contactsPath, contactsList);
      console.table(JSON.parse(contactsList));
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = { id: shortid.generate(), name, email, phone };
      const contactsList = JSON.stringify(
        [newContact, ...contacts],
        null,
        "\t"
      );
      fs.writeFile(contactsPath, contactsList);
      console.table(JSON.parse(contactsList));
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
