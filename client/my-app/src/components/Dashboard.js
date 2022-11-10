import React from 'react'
import Sidebar from './Sidebar'
import './dashboard.css'
import { useConversation } from '../Context/ConversationProvider'
import OpenConversation from './OpenConversation';

export default function Dashboard({id}) {
  const {selectedConversation}= useConversation();
  return (
    <div className='dash'><Sidebar id={id}/>
    {selectedConversation && <OpenConversation />}
    </div>
    
  )
}
