const express=require('express')
const expenseRoutes=require('./routes/expense.routes');
const errorHandler=require('../src/middlewares/error.middleware')

const app=express()


app.use(express.json());
app.use('/api/expenses',expenseRoutes);

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Smart expense tracker api is running"
    });
});

app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"Route not found"
    });
});

app.use(errorHandler)


module.exports=app;