import React, { useState, useEffect } from 'react';
import ContactForm from '../contact-form/ContactForm.jsx';
import ContactList from '../contact-list/ContactList.jsx'; 
import css from './App.module.css'; 

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const deleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className={css.container}> 
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={addContact} />
      
      <h2>Contacts</h2> 
      <ContactList contacts={contacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App; 