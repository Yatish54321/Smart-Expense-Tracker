const {body,validationResult}=require('express-validator')

const validateExpense=[

    body("title")
    .trim()
    .isLength({max:100})
    .withMessage("Title cannot exceed 100 characters")
    .notEmpty()
    .withMessage("Title is required"),

    body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({gt:0})
    .withMessage("Amount must be greater than 0"),

    body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

    body("date")
    .notEmpty()
    .withMessage("Date is required")
    .matches(/^\d{2}-\d{2}-\d{4}$/)
    .withMessage("Date must be in DD-MM-YYYY format")
];

const handleValidationError=(req,res,next)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            errors:errors.array()
        });
    }

    next();
};

module.exports={validateExpense,handleValidationError};