const {readExpenses,writeExpenses}=require('../utils/file.utils');
const {v4:uuidv4}=require('uuid');

async function getAllExpense(){
   const expenses=await readExpenses();

   return expenses;
}


async function addExpense(expenseData){
   const expenses=await readExpenses();

   const {title, amount, category, date}=expenseData;

   const newExpense={
    id: uuidv4(),
    title,
    amount,
    category,
    date,
    createdAt:new Date().toISOString()
   };

   expenses.push(newExpense);
   await writeExpenses(expenses);
   return newExpense;
}

async function deleteExpense(id){
    const expenses=await readExpenses();

    const index=expenses.findIndex(
        expense => expense.id === id
    );

    if(index===-1){
        const error= new Error("Expense not found");
        error.statusCode=404;
        throw error;
    }

    const deletedExpense=expenses.splice(index,1)[0];

    await writeExpenses(expenses);

    return deletedExpense;

}

async function filterbyCategory(category){
    const expenses=await readExpenses();
    
    const filteredExpenses=expenses.filter(
        expense=> expense.category.toLowerCase()===category.toLowerCase()
    );

    return filteredExpenses;
}

async function totalExpense(){
    const expenses=await readExpenses();

    const total=expenses.reduce(
        (sum,expense)=>sum+expense.amount,
        0
    );

    return {
        totalExpense:total,
        expenseCount:expenses.length
    };
}

async function totalbyCategory(category){
    const expenses=await readExpenses();

    const filterExpenses=expenses.filter(
        expense=>expense.category.toLowerCase()===category.toLowerCase()
    );

    const total=filterExpenses.reduce(
        (sum,expense)=>sum+expense.amount,0
    );

    const expenseCount=filterExpenses.length;

    return {
        category:category,
        totalExpensesAmount:total,
        expenseCount
    };
}

async function monthlySummary(){
    const expenses=await readExpenses();

    const summary={}

    for(const expense of expenses){
        const [,month,year]=expense.date.split("-");

        const monthKey=`${month}-${year}`;

        if(!summary[monthKey]){
            summary[monthKey]={
                month:monthKey,
                totalExpenses:0,
                expenseCount:0
            };
        }

        summary[monthKey].totalExpenses+=expense.amount;
        summary[monthKey].expenseCount++;
    }
    for(const month of Object.values(summary)){
       month.averageExpense=Number(month.totalExpenses/month.expenseCount).toFixed(2);
    }

    return Object.values(summary);
}


module.exports={
    getAllExpense,addExpense,deleteExpense,filterbyCategory,totalExpense,totalbyCategory,monthlySummary
}