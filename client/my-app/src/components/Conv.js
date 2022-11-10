import React from 'react'
import { useConversation } from '../Context/ConversationProvider';

export default function Conv() {
  const {formattedConv,selectConversationIndex}=useConversation();
  // console.log(formattedConv);
  return (
    <ul className="contacts">
      {formattedConv.map((conv,index) => {
        return (
          <li 
           className="contact" key={index}
           onClick={()=>{
             selectConversationIndex(index)
             console.log(conv.recepients)
           }}
           style={conv.selected?{border:'solid'}:{}}
           >
            {conv.recepients.map(r=>r.name).join(" ,")}
          </li>
        );
      })}
    </ul>
  );
}
