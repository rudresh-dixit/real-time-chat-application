// Inside this component the super important socket.io logic is going
// to be stored.

import React from 'react'

// useEffect - for lifecycle methods inside of hooks.
import { useState, useEffect } from 'react'; 

 // query-string - help us getting data from the url.
import queryString from 'query-string';

import io from 'socket.io-client';
import './Chat.css'; 

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


let socket;

function Chat({ location }) {

    //setting up the state
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');

    // Specify the every single message.
    const [message, setMessage] = useState('');

    // Array to store all messages.
    const [messages, setMessages] = useState([]); 

    // const ENDPOINT = 'https://s-er-ve-r.herokuapp.com/';
    const ENDPOINT = 'localhost:5000';

    // useEffect hook takes an arrow function as input.
    // This useEffect hook handles connection and disconnection.
    useEffect(() => {

        // Location actually comes from react router and it gives us
        // a prop called location.
        // location.search doesn't gives us a full url but only the 
        // parameters.
        // queryString.parse provides us the object there.
        const { name, group } = queryString.parse(location.search);

        // When we are going to set our first connection, we set the socket.
        socket = io(ENDPOINT);

        setName(name);
        setGroup(group);

        // Now, we can emit different events using this specific instance 
        // of socket. 
        
        // We pass in a string that backend is going to recognize.
        // And then something is going to happen on the backend
        // whenever it recognizes this emitted event. 

        // And 2nd parameter is an object. We can receive this object
        // in the backend.
        // Like in this case, on join we are going to do something 
        // in backend.

        // We have access to the callback of parameter function in
        // socket.on() on server side as a 3rd parameter in
        // socket.emit() on client side.
        socket.emit('join', { name, group }, () => {

            // This function is going to be executed when callback
            // function in socket.on() on server side is called.

            // Great way of error handling whenever a specific event
            // is emitted.
        });

        // This return is used for unmounting. Simply provide a
        // function that's how use effect hook is implemented. 
        return () => {

            // Happening when unmounting of the component when we
            // are leaving the chat.
            socket.emit('disconnect');

            // This turns off the one instance of client socket. So
            // we do not have to bother with it anymore.
            socket.off();
        }

        // Only if location.search value change we need to rerender our use effect.
        // No more unnecessary side effects will happen.
    }, [ENDPOINT, location.search]); 



    // This useEffect hook deals with messages.
    useEffect(() => {

        // Listens for messages.
        // Keep track of all messages with state.
        // Message is sending as a payload of user and text.
        socket.on('message', (message) => {

            // We can push this message to our messages array.
            // Since we simply cannot mutate the state, we are going
            // to spread all other messages and add one message on it.
            setMessages([...messages, message]);
        })

        // We're only going to run it when messages array changes.
    }, [messages])



    // Function for sending messages.
    const sendMessage = (event) => {

        // As full browser refreshes are not good
        // Prevent the default behaviour of a keypress or a button
        event.preventDefault();
        
        // When we send a message, let simply clear the message field.
        // Acheived through the callback function.
        if(message) socket.emit('sendMessage', message, () => setMessage(''));
    }

    console.log(message, messages);

    return (
        <div className = "outerContainer">
            <div className = "container">

                {/* <input value = { message }
                 onChange = { (event) => setMessage(event.target.value) }
                 onKeyPress = { (event) => event.key ==='Enter' ? sendMessage(event) :null } /> */}

                <InfoBar group = { group } />
               
                <Messages messages = { messages } name = { name } />

                <Input message = { message } setMessage = { setMessage } sendMessage = { sendMessage } />

            </div>
        </div>
    )
}

export default Chat
