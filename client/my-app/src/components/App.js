import Login from "./Login";
// import {useState} from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import {ConatctProvider} from "../Context/ConatctProvider";
import  {ConversationProvider}  from "../Context/ConversationProvider";
import  {SocketProvider}  from "../Context/SocketProvider";
function App() {
  const [id, setId] = useLocalStorage("-id")
  const dashboard = (
    <SocketProvider id={id}>
      <ConatctProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ConatctProvider>
    </SocketProvider>
  );
  return (
      id!=null ?  dashboard:<Login onIdSubmit={setId} />
  );
}

export default App;
