
const service = require('../service_layer/service.js');



exports.find = async(req,res)=>{
    try{
        const fetchusers = await service.getUser();
        res.json(fetchusers);
    }
    catch(error){
        console.error('error while retrieving the data',error);
        res.status(500).json({error:'error'});
    }
};

exports.update = async(req,res)=>{
    try{
        const {actor_id} = req.params;
        const {first_name} = req.body;
        const updatedactor = await service.updateUser(actor_id, first_name);
        if(!updatedactor){
           console.log("actor id is invalid");
        }
        res.json(updatedactor);
      } 
      catch (error) {
        console.error('Error while updating record:', error);
        res.status(500).json({ error: 'error' });
      }
};

exports.create = async(req,res)=>{
    try{
        const {first_name,last_name} = req.body;
        const newactor = await service.createUser(first_name, last_name);
        res.json(newactor);
    }
    catch(error){
        console.error('Error ehile creating record:', error);
        res.status(500).json({error: 'error' });

    }
    
};

exports.removeactor = async(req,res)=>{
    try{
        const{actor_id} = req.params;
        const deleteactor = await service.removeUser(actor_id);
        if(!deleteactor){
            console.log("actor_id is invalid");
        }
        res.json(deleteactor);
    }
    catch(error){
        console.error('erroe while deleting the record',error);
        req.status(500).json({error:'error'});
    }
};
