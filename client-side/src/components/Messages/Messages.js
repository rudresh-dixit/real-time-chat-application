import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import Message from '../Message/Message'

function Messages({ messages, name }) {
  return (
    <div>

      {/* react scroll to bottom will be used */}
      {/* wrapper component */}
      <ScrollToBottom> 
        { messages.map((message, i) => <div key = { i }><Message message = { message } name = { name } /></div>) }
      </ScrollToBottom> 
    </div>
  )
}

export default Messages
