import React, { useRef } from 'react'
import {v4 as uuidV4} from 'uuid'
import "./login.css"
export default function Login({onIdSubmit}) {  
  const idRef=useRef()
  function handleSubmit(e){
    e.preventDefault();
    onIdSubmit(idRef.current.value)
  }
  function createNewId(){
      onIdSubmit(uuidV4())
  }
  return (
    <body className='full'>
      {/* <div className="cont"> */}
        <form onSubmit={handleSubmit} className="logForm">
          <label htmlFor="id">Enter your Id</label>
          <input type="text" id="id" ref={idRef} required />
          <input type="submit" />
          <button onClick={createNewId}>Create new id</button>
        </form>
      {/* </div> */}
    </body>
  );
}
