import React, { useState } from 'react'
import { useContacts } from '../Context/ConatctProvider'
import { useConversation } from '../Context/ConversationProvider';
import './convmodal.css'
export default function ConversationModal({close}) {
  const {contacts}=useContacts();
  const [selectedContactIds,setSelectedContactIds]=useState([]);
  const { formattedConv, createConversation } = useConversation();
  function handleSubmit(e){
    console.log(formattedConv);
    e.preventDefault();
    if(selectedContactIds.length>0)
    createConversation(selectedContactIds);
    close();
  }
   function handleCheckboxChange(id){
     setSelectedContactIds((prevId)=>{
      if(prevId.includes(id))
      return prevId.filter(item=>item!==id)
      return [...prevId,id]
    }
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      {
        contacts.map((contact)=>{return (
        
            <label
              key={contact.id+contact.name}
              id={contact.id + contact.name}
              htmlFor={contact.id}
              className='labels'
            >
              <input id={contact.id} key={contact.id} type="checkbox" 
              className='checkboxes'
               value={selectedContactIds.includes(contact.id)}
                 onChange={()=>{handleCheckboxChange(contact.id)
                //  console.log(selectedContactIds) 
                 }}
               />
              {contact.name}
            </label>
        );}
        )
      }
      <input type='submit'/>
      </form>
    </div>
    )
  }
  