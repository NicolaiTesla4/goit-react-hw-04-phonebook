import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const ContactForm = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !number) {
      alert('Please fill out all fields.');
      return;
    }

    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert('This contact already exists!');
      return;
    }

    onSubmit({ id: nanoid(), name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor="name" className={css.label}>Name:</label>
      <input
        type="text"
        id="name"
        name="contactName"
        pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,25}[ ]{1}[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,25}"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
        required
        value={name}
        onChange={handleNameChange}
      />
      <label htmlFor="number" className={css.label}>Number:</label>
      <input
        type="tel"
        id="number"
        name="number"
        pattern="\\\\+?\\\\d{1,4}[-.\\s]?\\\\(\\\\?\\\\d{1,3}\\\\)?[-.\\s]?\\\\d{1,4}[-.\\s]?\\\\d{1,4}[-.\\s]?\\\\d{1,9}" 
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleNumberChange}
      />
      <button type="submit" className={css.button}>Add Contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm; 