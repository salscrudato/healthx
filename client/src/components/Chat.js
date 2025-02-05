import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Chat() {
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState([]); // array of { sender: "user"|"ai", text: string }
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userMessage.trim()) {
      setErrorMessage('Please enter a message');
      return;
    }
    setErrorMessage('');

    const newConversation = [...conversation, { sender: 'user', text: userMessage }];
    setConversation(newConversation);
    setUserMessage('');

    try {
      const response = await fetch('http://localhost:5050/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setConversation([...newConversation, { sender: 'ai', text: data.message }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="chat-container min-h-screen bg-gray-50 p-4">
      {/* Back to Dashboard Link */}
      <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        <span>Back to Dashboard</span>
      </Link>

      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">AI Chat</h1>

      {/* Chat History */}
      <div className="chat-history bg-white rounded-lg shadow p-4 mb-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
        {conversation.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 mb-2">{errorMessage}</div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;

// // client/src/components/Chat.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Chat() {
//   const [userMessage, setUserMessage] = useState('');
//   const [botReply, setBotReply] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!userMessage.trim()) {
//       setErrorMessage('Please enter a message');
//       return;
//     }
//     setErrorMessage('');
//     setBotReply('');

//     try {
//       const response = await fetch('http://localhost:5050/api/ask', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userMessage }),
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setBotReply(data.message);
//       setUserMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setErrorMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#f5f5f5',
//       fontFamily: 'Arial, sans-serif',
//       padding: '1rem'
//     }}>
//       {/* “Back to Dashboard” Link */}
//       <Link to="/" style={{
//         display: 'inline-block',
//         marginBottom: '1rem',
//         textDecoration: 'none',
//         color: '#007BFF',
//         fontWeight: 'bold'
//       }}>
//         &larr; Back to Dashboard
//       </Link>

//       <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>AI Chat</h1>

//       <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '1rem' }}>
//         <input
//           type="text"
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           placeholder="Ask a question..."
//           style={{
//             flexGrow: 1,
//             padding: '0.5rem',
//             marginRight: '0.5rem',
//             borderRadius: '4px',
//             border: '1px solid #ccc'
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: '0.5rem 1rem',
//             backgroundColor: '#007BFF',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           Send
//         </button>
//       </form>

//       {errorMessage && (
//         <div style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</div>
//       )}

//       {botReply && (
//         <div style={{
//           backgroundColor: '#f4f4f4',
//           padding: '1rem',
//           borderRadius: '5px'
//         }}>
//           <strong style={{ display: 'block', marginBottom: '0.5rem' }}>AI says:</strong>
//           <p style={{ margin: 0 }}>{botReply}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;