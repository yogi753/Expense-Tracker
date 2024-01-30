const express = require('express')
const mongoose = require('mongoose')
const app = express()
//const port = 3000

const Expense=require('./models/expense')

//mongoose.connect("mongodb://0.0.0.0:27017/expense-tracker"),{

mongoose.connect('mongodb+srv://20ISR060:20ISR060@cluster0.qimsl1t.mongodb.net/newDb?retryWrites=true&w=majority'),{
    useUnifiedTopology:true
};
app.use(express.json());

//FIND api (using GET method)
app.get('/expense', async (req, res) => {
    const result=await Expense.find();
  res.send(result)
})

//GET by ID from DB using postman  (FIND BY ID) 
app.get('/expense/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const result = await Expense.findById(id);
        if(result)
            res.send(result);
        else
            res.send ("No such Expenses were found according to ur id");
    }
    catch(err){
        res.send(err);
    }
})

//Delete by ID from DB using postman
app.delete('/expense/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const result = await Expense.findByIdAndDelete(id);
        if(result)
            res.send(result);
        else
            res.send ("No such Expenses were found according to ur id");
    }
    catch(err){
        res.send(err);
    }
})


//CREATE operation in DB using postman
app.post('/expense', async (req, res) => {
    console.log(req.body);
    const newExpense = req.body;
    await Expense.create(newExpense);
    res.send('Created');
})

// --v : 0   -------->  In Mongo DB this kind of statement refers to "versioning purpose" [ignore this statement in json].

//UPDATE operation in postman API using DB
//update api without trycatch block 
// app.put('/expense/:id', async(req, res) => {
//     const id = req.params.id;
//     const updateObject = req.body;
//     const updatedObject = await Expense.findByIdAndUpdate(id, {$set: updateObject}, {
//         new: true
//     })
//     res.send(updatedObject);
// })

//update api within TRY CATCH block
app.put('/expense/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateObject = req.body;

        const updatedObject = await Expense.findByIdAndUpdate(id, { $set: updateObject }, {
            new: true
        });

        if (!updatedObject) {
            return res.send("No such Expenses were found according to ur id");
        }

        res.send(updatedObject);
    } catch (err) {
        res.send(err);
    }
});



app.post('/expenses', (req, res) => {
    res.send('hello im yokesh from KEC')
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})