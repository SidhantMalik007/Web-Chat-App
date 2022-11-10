import React, {  useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ConatctProvider';
import { useSocket } from './SocketProvider';
const ConversationContext=React.createContext()
export function useConversation()
{
    return useContext(ConversationContext)
}
export  function ConversationProvider({children,id}){
// export default function ConversationProvider() {
    const [conversations,setConversations]=
    useLocalStorage('-conversation',[]);
    const [selectedConversationIndex,setSelectedConversationIndex]=useState(0);
    const {contacts}=useContacts();
    const socket=useSocket();
    // console.log(socket);
    function createConversation(recepients){
        setConversations((prev)=>[...prev,{recepients,messages:[]}])
    }
    const addMessageToConversation= useCallback(({recepients,text,sender})=>
    {
        setConversations((prevConv=>{
            let changeMade=false;
            const newMessage={sender,text}
            const newConversations=prevConv.map(conv=>{
                if(arrayEquality(conv.recepients,recepients)){
                    changeMade=true;
                    return{...conv,
                        messages:[...conv.messages,newMessage]}
                }
                return conv; 
            })
            if(changeMade){
                return newConversations;
            }
            else{
                return[
                    ...prevConv,
                    {recepients,messages:[newMessage]}
                ]
            }
        }))
    },[setConversations]);
    useEffect(()=>{
        if(socket === 2)return
        socket.on('receive-message',addMessageToConversation)
        return ()=>socket.off('receive-message')
    },[socket,addMessageToConversation])
    function sendMessage(recepients,text){
        socket.emit('send-message',{recepients,text})
        addMessageToConversation({recepients,text,sender:id})
    }
    const formattedConv=conversations.map((conversation,index)=>{
        const recepients=conversation.recepients.map((recepient)=>{
            const contact=contacts.find(contact=>{
                return contact.id===recepient
            })
             const name=(contact && contact.name) || recepient
             
             return {id:recepient,name}
        })
        const messages=conversation.messages.map((message)=>{
             const contact = contacts.find((contact) => {
               return contact.id === message.sender;
             });
             const name = (contact && contact.name) || message.sender;
             const fromMe=id===message.sender
             return {...message,senderName:name,fromMe};
        })
        const selected = index === selectedConversationIndex;
        return {...conversation, messages, recepients, selected };
    })
    // console.log(formattedConv);
  return (
    <ConversationContext.Provider value={{formattedConv,sendMessage,
    selectedConversation:formattedConv[selectedConversationIndex],
    selectConversationIndex:setSelectedConversationIndex,createConversation}}>
        {children}
    </ConversationContext.Provider>
  )
}
function arrayEquality(a,b){
    if(a.length!==b.length)
        return false;
    a.sort()
    b.sort()
    let ret=true;
    a.forEach((element,index) => {
        if(element!==b[index])
            ret= false;
    }); 
    return ret;
    }