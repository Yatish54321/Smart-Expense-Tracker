const expenseService=require('../services/expense.services');

async function getAllExpenses(req,res,next){
   try{
    const expenses=await expenseService.getAllExpense();

   res.status(200).json({
     success:true,
     data:expenses
   });
  }catch(error){
    next(error);
  }
}


async function addExpense(req,res,next){
   try{
    const expense=await expenseService.addExpense(req.body);

   res.status(201).json({
       success:true,
       data:expense
   });
  }catch(error){
    next(error);
  }
}

async function deleteExpense(req,res,next){
    try{
        const deleteExpense=await expenseService.deleteExpense(req.params.id);

        res.status(200).json({
            success:true,
            data:deleteExpense
        });
    }catch(error){
        next(error);
    }
}

async function getExpensesByCategory(req,res,next){
    try{
        const expenseByCategory=await expenseService.filterbyCategory(req.params.category);

        res.status(200).json({
            success:true,
            data:expenseByCategory
        });
    }catch(error){
        next(error);
    }
}

async function getTotalExpense(req,res,next){
    try{
        const totalExpense=await expenseService.totalExpense();

        res.status(200).json({
            success:true,
            data:totalExpense
        });
    }catch(error){
        next(error);
    }
}

async function getTotalByCategory(req,res,next){
    try{
        const totalByCategory=await expenseService.totalbyCategory(req.params.category);

        res.status(200).json({
            success:true,
            data:totalByCategory
        });
    }catch(error){
        next(error);
    }
}

async function getMonthSummary(req,res,next){
    try{
        const summary=await expenseService.monthlySummary();

        res.status(200).json({
            success:true,
            data:summary
        });
    }catch(error){
        next(error);
    }
}


module.exports={
    getAllExpenses,addExpense,deleteExpense,getExpensesByCategory,getTotalExpense,getTotalByCategory,getMonthSummary
};