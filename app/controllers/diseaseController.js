const Disease = require('../models/disease');

function index(req,res){
    Disease.find({})
        .then(diseases => {
            if(diseases.length) return res.status(200).send({diseases});
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}

function show(req,res){
    if(req.body.error) return res.status(500).send({message:"El id no existe"});
    if(!req.body.disease) return res.status(404).send({message: 'NOT FOUND'});
    let disease = req.body.disease;
    return res.status(200).send({disease});
}

function create(req,res){
    new Disease(req.body).save().then(disease => res.status(201).send({disease})).catch(error => res.status(500).send({error}));
}

function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.disease) return res.status(404).send({message: 'NOT FOUND'});
    let disease = req.body.disease;
    disease = Object.assign(disease,req.body);
    disease.save().then(disease => res.status(200).send({message: "UPDATED", disease})).catch(error => res.status(500).send({error}));
}

function remove(req,res){
    if(req.body.error) return res.status(500).send({message:"El id no existe"});
    if(!req.body.disease) return res.status(404).send({message: 'NOT FOUND'});
    Disease.findOneAndDelete({
        _id : req.body.disease
    } , (err) => {
        if (err) return console.error(err);
        res.status(200).send('Disease successfully removed from polls collection!');
    });
}

function find(req,res,next){
    const diseaseId = req.params.diseaseId;

    Disease.findById(diseaseId).populate('diseases').exec( (err, findDisease) =>{
        try{
            disease = findDisease;
            req.body.disease = disease;
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