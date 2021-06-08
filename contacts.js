const shortid = require("shortid");

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data).find(({ id }) => id === Number(contactId));
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data).filter(
      ({ id }) => id !== Number(contactId)
    );

    const contactsList = JSON.stringify(result, null, "\t");
    await fs.writeFile(contactsPath, contactsList);
    console.table(JSON.parse(contactsList));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { id: shortid.generate(), name, email, phone };
    const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
    await fs.writeFile(contactsPath, contactsList);
    console.table(JSON.parse(contactsList));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
