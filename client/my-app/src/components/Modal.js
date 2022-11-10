import React from 'react'
import  "./modal.css"
import ReactDom from 'react-dom'
import ConversationModal from './ConversationModal';
import ContactsModal from './ContactsModal';
export default function Modal({open,hide,state}) {
    if(!open)
    return null;
    console.log(state);
  return ReactDom.createPortal(
    <div className="overlay">
      <div className="modal">
        <button className="close" onClick={hide}>
          X
        </button>
       { state==="conversation"?<ConversationModal close={hide}/>:<ContactsModal close={hide}/>}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
