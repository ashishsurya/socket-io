import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:4000');



function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("newmessage", (payload) => {
      console.log(payload)
      setChat([...chat,payload.message]);
    })
  })

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("newmessage", { message });
    setMessage("")
  };

  return (
    <div className='App'>
      <h1>Chat here</h1>
      {chat?.map((item , i) => (
        <p key={i}>{item}</p>
      ))}
      <form onSubmit={sendMessage}>
        <input
          type='text'
          placeholder='Enter your message.....'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App;
