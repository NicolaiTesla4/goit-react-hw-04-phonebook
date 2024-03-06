import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
    setFilteredContacts(filteredContacts);
  };

  return (
    <div>
      <input 
        type="text"
        onChange={handleFilterChange}
        placeholder="Search contacts by name..."
        className={css.filter}
      />
      <ul className={css.list}>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={() => onDeleteContact(contact.id)} className={css.button}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList; 