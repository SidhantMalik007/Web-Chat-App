import React from 'react'
import { useContacts } from '../Context/ConatctProvider';
import "./cont.css"
export default function Cont() {
  const{contacts}=useContacts()
  // console.log(contacts);
  return (
    <ul className='contacts'>
      {contacts.map((contact) => {
        return <li className='contact' key={contact.id}>{contact.name}</li>;
      })}
    </ul>
  );
}
