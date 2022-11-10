import React, { useRef } from 'react'
import { useContacts } from '../Context/ConatctProvider';

export default function 
ContactsModal({close}) {
    const idRef=useRef();
    const nameRef=useRef();
    const {contacts,createContact} = useContacts()
    function handleClick(e) {
        // console.log(e);
      e.preventDefault();
      console.log(contacts);
      createContact(idRef.current.value,nameRef.current.value)
      close();
    }
  return (
    <div>
      <form onSubmit={handleClick}>
        <label htmlFor="name">NAME</label>
        <input id="name" type="text" ref={nameRef} />
        <label htmlFor="ide">ID</label>
        <input id="ide" type="text" ref={idRef}/>
        <button type='submit' >CREATE</button>
      </form>
    </div>
  );
}
