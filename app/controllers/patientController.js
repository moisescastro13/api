const Patient = require('../models/Patient');

function index(req,res){
    Patient.find({})
        .then(patients => {
            if(patients.length) return res.status(200).send({patients});
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}

function show(req,res){
    if(req.body.error) return res.status(500).send({message:"El id no existe"});
    if(!req.body.patient) return res.status(404).send({message: 'NOT FOUND'});
    let patient = req.body.patient;
    return res.status(200).send({patient});
}

function create(req,res){
    new Patient(req.body).save().then(patient => res.status(201).send({patient})).catch(error => res.status(500).send({error}));
}

function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.patient) return res.status(404).send({message: 'NOT FOUND'});
    let patient = req.body.patient;
    patient = Object.assign(patient,req.body);
    patient.save().then(patient => res.status(200).send({message: "UPDATED", patient})).catch(error => res.status(500).send({error}));
}

function remove(req,res){
    if(req.body.error) return res.status(500).send({message:"El id no existe"});
    if(!req.body.patient) return res.status(404).send({message: 'NOT FOUND'});
    Patient.findOneAndDelete({
        _id : req.body.patient
    } , (err) => {
        if (err) return console.error(err);
        res.status(200).send('Patient successfully removed from polls collection!');
    });
}

function find(req,res,next){
    const patientId = req.params.patientId;

    Patient.findById(patientId).populate('patients').exec( (err, findPatient) =>{
        try{
            patient = findPatient;
            req.body.patient = patient;
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