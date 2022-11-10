import React, { useEffect, useRef, useState } from 'react'
import { useConversation } from '../Context/ConversationProvider';
import './opCon.css'
export default function OpenConversation() {
    const [text,setText]=useState("");
    const {sendMessage,selectedConversation}=useConversation();
    const lastMsgRef=useRef();
    const tarea=useRef()
    function handleSubmit(e){
        // console.log(lastMsgRef)
        
        if(e!==undefined){
          e.preventDefault();
        }
        if(text!=='')
        sendMessage(selectedConversation.recepients.map(r=>r.id) ,text)
        document.querySelector('.typeHere').value='';
        setText("");
    }
    useEffect(()=>{
        if(lastMsgRef.current!==undefined)
            lastMsgRef.current.scrollIntoView({ smooth: true });
    },[selectedConversation.messages.length])
  return (
    <div className="openConv">
      <div className= 'sm'>
        <div className="chats">
          {selectedConversation.messages.map((item, index) => {
            console.log(item.text)
            return (
              <div ref={index===selectedConversation.messages.length-1?lastMsgRef:null} key={index} className={`msg ${item.fromMe ? "me" : "notme"}`}>
                <div className="mainMsg">{item.text}</div>
                <div className="msgReceipt">
                  {item.fromMe ? "you" : item.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <form className="userInp" onSubmit={handleSubmit}>
        <textarea
        onKeyUp={(e)=>{
          if(e.key==='Shift')
            handleSubmit()
          
        }}
          className="typeHere"
          placeholder="type your message"
          onChange={(e) => {
            setText(e.target.value)
            }}
          ref={tarea}
        ></textarea>
        <button style={{width:'80px'}}
        onClick={()=>{
         const options = {
           method: "GET",
           headers: {
             "X-RapidAPI-Host": "jokeapi-v2.p.rapidapi.com",
             "X-RapidAPI-Key":
               "fcc6528d70msh3d568393c73de95p13e8dcjsnea1d1e075539",
           },
         };

         fetch("https://v2.jokeapi.dev/joke/Any?type=single", options)
           .then((response) => response.json())
           .then((data)=>{
             tarea.current.value=data.joke
             setText(data.joke)
           })
           .catch((err) => console.error(err));
        }}
        >GET JOKE</button>
        <input type="submit" style={{width:'80px'}}/>
      </form>
    </div>
  );
}
