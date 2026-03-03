import { useState, useRef } from 'react';
import { mockConversations, mockChatMessages } from '../data/mockData';
import './Messages.css';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(mockChatMessages);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const fileInputRef = useRef(null);

  const currentConv = mockConversations.find((c) => c.id === selectedChat);
  const chatMessages = selectedChat ? (messages[selectedChat] || []) : [];

  const handleSend = () => {
    if (!messageInput.trim() || !selectedChat) return;
    const newMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: messageInput.trim(),
      time: 'Just now',
    };
    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));
    setMessageInput('');
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles((prev) => [...prev, ...files.map((f) => ({ name: f.name, size: f.size }))]);
  };

  const removeAttachment = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleScheduleMeeting = () => {
    if (scheduleDate && scheduleTime) {
      const scheduleMsg = {
        id: `m-${Date.now()}`,
        sender: 'user',
        text: `📅 Meeting scheduled for ${scheduleDate} at ${scheduleTime}`,
        time: 'Just now',
      };
      setMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), scheduleMsg],
      }));
      setShowScheduleModal(false);
      setScheduleDate('');
      setScheduleTime('');
    }
  };

  return (
    <main className="messages-page">
      <div className="messages-container">
        <aside className="conversations-list">
          <h2>Conversations</h2>
          <div className="conversation-items">
            {mockConversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${selectedChat === conv.id ? 'active' : ''} ${conv.unread ? 'unread' : ''}`}
                onClick={() => setSelectedChat(conv.id)}
              >
                <div className="conv-avatar">{conv.avatar || conv.name[0]}</div>
                <div className="conv-info">
                  <div className="conv-header">
                    <span className="conv-name">{conv.name}</span>
                    <span className="conv-time">{conv.time}</span>
                  </div>
                  <p className="conv-company">{conv.company}</p>
                  <p className="conv-preview">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="chat-area">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <div>
                  <h3>{currentConv?.name}</h3>
                  <p>{currentConv?.company}</p>
                </div>
                <button
                  className="schedule-meeting-btn"
                  onClick={() => setShowScheduleModal(true)}
                >
                  📅 Schedule Meeting
                </button>
              </div>

              <div className="chat-messages">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}>
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                ))}
              </div>

              <div className="chat-input-area">
                <div className="chat-toolbar">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="file-input-hidden"
                    onChange={handleFileSelect}
                  />
                  <button
                    className="attach-btn"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach file"
                  >
                    📎 Attach
                  </button>
                  {attachedFiles.length > 0 && (
                    <div className="attached-files">
                      {attachedFiles.map((file, i) => (
                        <span key={i} className="attached-file">
                          {file.name}
                          <button onClick={() => removeAttachment(i)}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="chat-input-row">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  />
                  <button className="send-btn" onClick={handleSend}>
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="chat-placeholder">
              <div className="placeholder-icon">💬</div>
              <p>Select a conversation to start messaging</p>
              <span>Send messages, share files, and schedule meetings</span>
            </div>
          )}
        </section>
      </div>

      {showScheduleModal && (
        <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
            <h3>Schedule Meeting</h3>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleScheduleMeeting}>
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
