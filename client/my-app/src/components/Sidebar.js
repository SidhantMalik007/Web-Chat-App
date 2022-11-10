import React, { useEffect } from 'react'
import {useState} from 'react'
import Cont from './Cont'
import Conv from './Conv'
import Modal from './Modal'
import './sidebar.css'
const CONTACTS_KEY='contacts'
const CONVERSATION_KEY='conversation'
export default function Sidebar({id}) {
const [conv,setConv]=useState('active')
const [cont,setCont]=useState('')
const [activeState,setActiveState]=useState(CONVERSATION_KEY)
const [isOpen,setIsOpen]=useState(false)
let ActCom;
useEffect(()=>{
    setActiveState(conv==='active'?CONVERSATION_KEY : CONTACTS_KEY);
    // console.log(activeState.current);
    
},[conv,cont])
// console.log(activeState)
     switch (activeState) {
      case CONVERSATION_KEY:
        ActCom = <Conv />;
        break;
      case CONTACTS_KEY:
          ActCom = <Cont />;
        break;
      default:
          // console.log(activeState);
    }
  return (
    <>
      <div className="container">
        <div className="sideBar">
          <nav>
            <ul className='changer'>
              <li className='btn'>
                <button
                  className={conv}
                  onClick={() => {
                    setConv((p) => {
                      if (p === "" && cont === "active") {
                        setCont("");
                        return "active";
                      }
                      return "active";
                    });
                  }}
                >
                  {CONVERSATION_KEY}
                </button>
              </li>
              <li className='btn'>
                <button
                  className={cont}
                  onClick={() => {
                    setCont((p) => {
                      if (p === "" && conv === "active") {
                        setConv("");
                        return "active";
                      }
                      return "active";
                    });
                  }}
                >
                  {CONTACTS_KEY}
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="cont">{ActCom}</div>
        <div className="id-info">Your id:{id}</div>
        <button onClick={()=>{setIsOpen(true)}}>
          NEW {activeState === CONVERSATION_KEY ? "CONVERSATION" : "CONTACT"}
        </button>
      </div>
      <Modal open={isOpen} hide={()=>{
          setIsOpen(false)
      }} state={activeState}>

      </Modal>
    </>
  );
}
