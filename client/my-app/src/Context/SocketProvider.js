import React, {useState, useContext, useEffect } from 'react'
import io from 'socket.io-client'
const SocketContext=React.createContext();
export function useSocket(){
    return useContext(SocketContext)
}
export  function SocketProvider({id,children}) {
const [socket,setSocket]=useState(2)
useEffect(()=>{
    const newSocket = io("http://localhost:5000", {
      query: { id },
    });
    // console.log(newSocket);
    setSocket(newSocket)
    // console.log(socket);
    return ()=>newSocket.close()
},[id])
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}
