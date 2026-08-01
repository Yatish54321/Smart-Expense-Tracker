const express=require('express')
const expenseController=require('../controllers/expense.controller');
const {validateExpense,handleValidationError}=require('../middlewares/validation.middleware')
const router=express.Router()

// get all expense
router.get('/', expenseController.getAllExpenses)

// add new expense
router.post('/', validateExpense, handleValidationError ,expenseController.addExpense)

// delete expense
router.delete('/:id',expenseController.deleteExpense)

//filter by category
router.get('/category/:category', expenseController.getExpensesByCategory)

// Overall total
router.get('/total', expenseController.getTotalExpense)

// category-wise total
router.get('/total/:category', expenseController.getTotalByCategory)

// Month Summary
router.get('/summary/monthly', expenseController.getMonthSummary)


module.exports=router;