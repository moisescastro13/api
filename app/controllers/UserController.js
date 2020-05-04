const User = require('../models/User');

function index(req,res){
    User.find({})
        .then(users => {
            if(users.length) return res.status(200).send({users});
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}

function show(req,res){
    if(req.body.error) return res.status(500).send({message:"El id no existe"});
    if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
    let user = req.body.user;
    return res.status(200).send({user});
}

function create(req,res){
    new User(req.body).save().then(user => res.status(201).send({user})).catch(error => res.status(500).send({error}));
}

function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
    let user = req.body.user;
    user = Object.assign(user,req.body);
    user.save().then(user => res.status(200).send({message: "UPDATED", user})).catch(error => res.status(500).send({error}));
}

function remove(req,res){
    if(req.body.error) return res.status(500).send({message:"El id no existe"});
    if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
    User.findOneAndDelete({
        _id : req.body.user
    } , (err) => {
        if (err) return console.error(err);
        res.status(200).send('User successfully removed from polls collection!');
    });
}

function find(req,res,next){
    const userId = req.params.userId;

    User.findById(userId).populate('users').exec( (err, findUser) =>{
        try{
            user = findUser;
            req.body.user = user;
            next()
            
        }catch(err){
            req.body.error = err;
            next();
        }
    });
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    find
}