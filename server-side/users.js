// In this file we are going to create helper functions
// that are going to help us manage users.

// Functions which we are going to use in index.js

// Set up an array of users.
const users = [];

// This is going to take 3 parameters.
// We can destructure them properly.
const addUser = ({id, name, group}) => {

    // Rudresh Dixit = rudreshdixit
    name = name.trim().toLowerCase();
    group = group.trim().toLowerCase();

    // Find if the specific username occupied in a group.
    const existingUser = users.find((user) => user.group === group && user.name ===name);

    // if found same username, return an object with property error.
    if(existingUser) return { error: 'Username Is Not Available :(' };

    const user = { id, name, group };
    users.push(user);

    return { user }; 
}
 
const removeUser = (id) => {

    // try to find the user with that specific id.
    const index = users.findIndex((user) => user.id === id);

    // 0 in last because that will else return our spliced user.
    if (index != -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInGroup = (group) => users.filter((user) => user.group === group);

module.exports = { addUser, removeUser, getUser, getUsersInGroup };