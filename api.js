const express = require('express');
const pool = require('./db');

const router = express.Router();

router.get('/details',async(req,res)=>{
    try{
        const users = 'SELECT * FROM actor';
        const results = await pool.query(users);
        res.json(results.rows);
    }
    catch(error){
        console.error('error while retrieving the data',error);
        res.status(500).json({error:'error'});
    }
});

router.put('/details/:actor_id',async(req,res)=>{
    try{
        const {actor_id} = req.params;
        const {first_name} = req.body;
        const updateuser = 'UPDATE actor SET first_name = $1 WHERE actor_id = $2 RETURNING *';
        const values = [first_name, actor_id]; 
        const result = await pool.query(updateuser, values);
        res.json(result.rows[0]);
      } 
      catch (error) {
        console.error('Error while updating record:', error);
        res.status(500).json({ error: 'error' });
      }
});

router.post('/create',async(req,res)=>{
    try{
        const {first_name,last_name} = req.body;
        const createquery = 'INSERT INTO actor(first_name,last_name) VALUES ($1,$2) RETURNING *';
        const values = [first_name, last_name];
        const result = await pool.query(createquery,values);
        res.json(result.rows[0]);
    }
    catch(error){
        console.error('Error ehile creating record:', error);
        res.status(500).json({error: 'error' });

    }
    
});

router.delete('/remove/:actor_id', async(req,res)=>{
    try{
        const{actor_id} = req.params;
        const deletequery = 'DELETE FROM actor WHERE actor_id = $1 RETURNING *';
        const values = [actor_id];
        const result = await pool.query(deletequery,values);
        res.json(result.rows[0]);
    }
    catch(error){
        console.error('erroe while deleting the record',error);
        req.status(500).json({error:'error'});
    }
});

module.exports = router;