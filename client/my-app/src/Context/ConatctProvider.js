import React,{useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
const ConatctContext=React.createContext()
export function useContacts(){
  return useContext(ConatctContext)
}
export  function ConatctProvider({children}) {
  const [contacts,setContacts]=useLocalStorage('-contacts',[])
  function createContact(id,name){
    setContacts(prev=>[...prev,{id,name}])
  }
  return (
    <ConatctContext.Provider value={{contacts,createContact}}>
      {children}
    </ConatctContext.Provider>
  )
}
