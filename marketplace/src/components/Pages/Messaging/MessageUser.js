import React, { useState } from 'react';
import { auth, collection, doc, addDoc } from '../../../firebaseConfig';

const MessageUser = ({ user }) => {
  const [text, setText] = useState('');

  const handleMessageSend = async (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    const message = {
      text,
      senderId: auth.currentUser.uid,
      receiverId: user.id,
      createdAt: new Date(),
    };

    await addDoc(collection(doc(collection(auth, 'users'), auth.currentUser.uid), 'messages'), message);

    setText('');
  };

  return (
    <div className="message-user-container">
      <form onSubmit={handleMessageSend}>
        <h2>Send a message to {user.displayName}</h2>
        <div className="message-input">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="chat-input"
            placeholder="Type your message..."
          />
          <button type="submit" className="chat-button">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageUser;
