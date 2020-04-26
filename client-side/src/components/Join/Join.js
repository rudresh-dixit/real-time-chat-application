// Here we are going to use react hooks.
// We can actually use state and lifecycle methods inside the 
// functional components.

// useState is a hook to use state inside functional components.
import React, { useState } from 'react'

 //link to our /chat path
import { Link } from 'react-router-dom';

// Prepare a specific css file for every component. 
import './Join.css'; 

function Join() {

    // Declaring hooks. First parameter is a variable and second is a 
    // setter function. Inside useState we pass the initial value that 
    // the variable is going to have.
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');

    return (
        <div className = "joinOuterContainer">
            <div className = "joinInnerContainer">
                <h1 className = "heading">Join Group</h1>
                {/* When someone is going to type somthing event is going to occur. */}
                {/* And we can simply get the data by event.target.value */}
                <div><input placeholder = "Enter Your Name..." className = "joinInput" type = "text" onChange = { (event) => setName(event.target.value) } /></div>
                <div><input placeholder = "Enter The Group..." className = "joinInput mt-20" type = "text" onChange = { (event) => setGroup(event.target.value) } /></div>

                {/* We are going to pass the data as an url. */}
                {/* With this we will be able to read the name and the group from join component. */}
                {/* We could have this by passing props or redux, but have not done it for the sake of simplicity. */}
                <Link onClick = { (event) => !name || !group ? event.preventDefault() : null } to = { `/chat?name = ${ name }&group = ${ group }` }> 

                    {/* event.preventDefault() prevents the button click if data is not sufficient. */}
                    <button className = "button mt-20" type = "submit">Log In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
