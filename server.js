const express = require('express');
const carDB = require('./data/cars');
const DBTable = require('./data/DBClass');
const { Exception } = require('./utilities/utils');

const app = express();
const db = new DBTable(carDB, 'cars', 'VIN');

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const cars = await db.get();
        res.json(cars);
    }catch(exc){
        const thrownException = exc.message.length >= 1 ? exc : new Exception(503, 'Something Went Wrong');
        res.status(thrownException.code).send(thrownException.message);
    }
    
});

app.get('/:VIN', async (req, res) => {
    try{
        const car = await db.getByPrimaryKey(req.params.VIN, 'VIN');
        if(! car) throw new Exception(404, 'Car Not Found');
        res.json(car);
    }catch(exc){
        const thrownException = exc.message.length >= 1 ? exc : new Exception(503, 'Something Went Wrong');
        res.status(thrownException.code).send(thrownException.message);
    }
});

app.post('/', async (req, res) => {
    try{
        const newCar = req.body.car;
        if(! (newCar.VIN && newCar.make && newCar.model && newCar.mileage )) throw new Exception(400, 'VIN, Make, Model, and Mileage are required');
        const confirmation = await db.insert(newCar);
        console.log('Confirmation: ', confirmation);
        res.status(201).json(confirmation);
    }catch(exc){
        const thrownException = exc.message.length >= 1 ? exc : new Exception(503, 'Something Went Wrong');
        const responseMessage = { code: thrownException.code, message: thrownException.message };
        res.status(thrownException.code).send(responseMessage);
    }
});

app.put('/:VIN', async (req, res) => {
    try{
        if( !req.params.VIN  ) throw new Exception(400, 'VIN required');
        const carUpdates = req.body.car;
        const validCar = await db.getByPrimaryKey(req.params.VIN);

        if(! validCar) throw new Exception(404, 'Car Not Found');
        
        const confirmation = await db.update(req.params.VIN, carUpdates);
        res.status(201).json(confirmation);
    }catch(exc){
        const thrownException = exc.message.length >= 1 ? exc : new Exception(503, 'Something Went Wrong');
        const responseMessage = { code: thrownException.code, message: thrownException.message };
        res.status(thrownException.code).send(responseMessage);
    }
});


app.delete('/:VIN', async (req, res) => {
    try{
        if( !req.params.VIN  ) throw new Exception(400, 'VIN required');
        const validCar = await db.getByPrimaryKey(req.params.VIN);
        if(! validCar) throw new Exception(404, 'Car Not Found');

        const deletionConfirmation = await db.delete(req.params.VIN);
        res.status(200).json(deletionConfirmation);
    }catch(exc){
        const thrownException = exc.message.length >= 1 ? exc : new Exception(503, 'Something Went Wrong');
        res.status(thrownException.code).send(thrownException.message);
    }
});



app.listen(3000, () => console.log('listening...'));