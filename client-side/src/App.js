import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// For simplicity pass props as query parameters


import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

// When the user first stumbled on our page he is going to be greeted with a join component.
// Then he is going to pass the data to login form.
// Through two query strings, we pass out data to the chat. 

const App = () => {
    return(
    <Router>
        <Route path = "/" exact component = { Join } />
        <Route path = "/chat" component = { Chat } />
        {/* It is not exact path as we are going to pass our properties. */}
    </Router>
)}

export default App;