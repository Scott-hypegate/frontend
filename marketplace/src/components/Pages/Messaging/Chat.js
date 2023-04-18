import { useEffect, useState } from 'react';
import { auth, onSnapshot, query, collection, orderBy, where } from '../../../firebaseConfig';
import './Chat.css';

const Chat = ({ db }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageSend = async (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    const otherMemberId = currentConversation.members.find(memberId => memberId !== auth.currentUser.uid);

    const message = {
      text,
      senderId: auth.currentUser.uid,
      receiverId: otherMemberId,
      createdAt: new Date(),
    };
    
    // Add the message to the current conversation if db and currentConversation are not null
    if (db && currentConversation) {
      await db.collection('messages').doc(currentConversation.id).collection('messages').add(message);
    }
    
    // Clear the text input
    setText('');
  };

  useEffect(() => {
    // Listen for new conversations in the messages collection and update the state with the new conversations
    if (db) {
      const messagesRef = collection(db, 'messages');
      const queryRef = query(messagesRef, orderBy('createdAt', 'asc'), where('senderId', '==', auth.currentUser.uid), where('receiverId', '==', auth.currentUser.uid));
  
      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const newConversations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setConversations(newConversations);
      });
  
      // Unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [db]);
  

  useEffect(() => {
    // Listen for new messages in the current conversation and update the state with the new messages
    if (db && currentConversation) {
      const messagesRef = db.collection('messages').doc(currentConversation.id).collection('messages');
      const queryRef = query(messagesRef, orderBy('createdAt'));

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(newMessages);
      });

      // Unsubscribe from the listener when the component unmounts or when the current conversation changes
      return () => unsubscribe();
    } else {
      setMessages([]);
    }
  }, [db, currentConversation]);

  const handleConversationSelect = (conversation) => {
    setCurrentConversation(conversation);
  };

  return (
    <div className="chat-container">
      <div className="conversation-list">
        {conversations.length === 0 && <p>No conversations yet!</p>}
        {conversations.map((conversation) => (
          <div key={conversation.id} className="conversation-item" onClick={() => handleConversationSelect(conversation)}>
            <p className="conversation-name">{conversation.name}</p>
            {conversation.lastMessage && (
              <>
                <p className="message-text">{conversation.lastMessage.text}</p>
                <p className="message-user">{conversation.lastMessage.senderId}</p>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="chat-form">
        {currentConversation ? (
          <form onSubmit={handleMessageSend}>
            <div className="conversation-header">
              <p>{currentConversation.name}</p>
            </div>
            <div className="conversation-messages">
              {messages.length === 0 && <p>No messages yet!</p>}
              {messages.map((message) => (
                <div key={message.id} className="chat-message">
                  <p className="message-text">{message.text}</p>
                  <p className="message-user">{message.senderId}</p>
                </div>
              ))}

            </div>
            <div className="conversation-input">
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
        ) : (
          <p>Select a conversation to start chatting!</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
