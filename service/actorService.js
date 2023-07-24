const db = require('../connector/db');


async function createUser(first_name, last_name){
    const insertquery = ' INSERT INTO actor (first_name, last_name) VALUES ($1,$2) RETURNING * ';
    const values = [first_name, last_name];
    const result = await db.query(insertquery, values);
    return result.rows[0];
}

async function getUser(){
    const getquery = 'SELECT * FROM actor';
    const result = await db.query(getquery);
    return result.rows;
}

async function updateUser(actor_id, first_name){
    const updatequery = ' UPDATE actor SET first_name = $1 WHERE actor_id = $2 RETURNING * ';
    const values = [first_name, actor_id];
    const result = await db.query(updatequery, values);
    return result.rows[0];
}

async function removeUser(actor_id){
    const removequery = ' DELETE FROM actor WHERE actor_id = $1 RETURNING * ';
    const values = [actor_id];
    const result = await db.query(removequery, values);
    return result.rows[0];
}

module.exports ={
    createUser,
    getUser,
    updateUser, 
    removeUser,
};