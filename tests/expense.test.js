const request=require('supertest')
const app=require('../src/app')
const fs=require('fs').promises
const path=require('path')

const filepath=path.join(
    __dirname,
    '../src/data/expenses.json'
);

beforeEach(async()=>{
    await fs.writeFile(
        filepath,
        JSON.stringify([],null,2)
    );
});


describe("Expense API",()=>{

    const expenseData={
        title:"Pizza",
        amount:399,
        category:"Food",
        date:"01-01-2026"
    };
    test("should create a new expense",async()=>{

        const response=await request(app)
        .post("/api/expenses")
        .send(expenseData);

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe("Pizza");
        expect(response.body.data.amount).toBe(399);
        expect(response.body.data.category).toBe("Food");
        expect(response.body.data.id).toBeDefined();
    });

    test("should get all expenses",async()=>{

        await request(app)
        .post('/api/expenses')
        .send(expenseData);

        const response=await request(app)
        .get('/api/expenses');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        // expect(response.body.data.length).toBe(1);
        // expect(response.body.data[0].title).toBe("Pizza");
    });

    test("should delete an expense", async()=>{
        const createResponse=await request(app)
        .post('/api/expenses')
        .send(expenseData)

        const id=createResponse.body.data.id;

        const response=await request(app)
        .delete(`/api/expenses/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(id);
    });


    test("should remove expense from list after deletion",async ()=>{
        const createResponse=await request(app)
            .post("/api/expenses")
            .send(expenseData);

        const id=createResponse.body.data.id;

        await request(app)
            .delete(`/api/expenses/${id}`);

        const response = await request(app)
            .get("/api/expenses");

        expect(response.body.data.length).toBe(0);
    });


    test("should filter expenses by category",async()=>{
        await request(app).post('/api/expenses').send(expenseData);

        await request(app).post('/api/expenses').send({
            title:"Bus",
            amount:100,
            category:"Travel",
            date:"01-01-2026"
        });

        const response=await request(app)
        .get('/api/expenses/category/Food');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].category).toBe("Food");
    });


    test("should get total expense", async()=>{
        await request(app).post('/api/expenses').send(expenseData);

        await request(app).post('/api/expenses').send({
            title:"Burger",
            amount:201,
            category:"Food",
            date:"01-01-2026"
        });

        const response=await request(app)
        .get('/api/expenses/total');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.totalExpense).toBe(600);
        expect(response.body.data.expenseCount).toBe(2);
    });

    test("should reject invalid expense data",async()=>{
        const response=await request(app)
        .post('/api/expenses')
        .send({
            title:"",
            amount:0,
            category:"",
            date:"01/01/2026"
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toBeDefined();
    });

    test("should calculate total expense by category",async()=>{
        await request(app)
            .post("/api/expenses")
            .send(expenseData);

        await request(app)
            .post("/api/expenses")
            .send({
            title:"Burger",
            amount:201,
            category:"Food",
            date: "01-01-2026"
        });

        await request(app)
            .post("/api/expenses")
            .send({
                title:"Bus",
                amount:100,
                category:"Travel",
                date:"01-01-2026"
            });

        const response = await request(app)
            .get("/api/expenses/total/Food");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.category).toBe("Food");
        expect(response.body.data.totalExpensesAmount).toBe(600);
        expect(response.body.data.expenseCount).toBe(2);
    });




    test("should return monthly summary", async()=>{
        await request(app).post("/api/expenses").send(expenseData);

        await request(app).post("/api/expenses").send({
            title:"Burger",
            amount:200,
            category:"Food",
            date:"10-01-2026"
        });

        await request(app).post("/api/expenses").send({
            title:"Bus",
            amount:100,
            category:"Travel",
            date:"05-02-2026"
        });

        const response=await request(app)
            .get("/api/expenses/summary/monthly");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBe(2);

    });

    test("should return 404 for deleting a non-existing expense",async()=>{
        const response=await request(app)
            .delete("/api/expenses/invalid-id");

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Expense not found");

    });


    test("should filter expenses regardless of category case", async()=>{
        await request(app)
            .post("/api/expenses")
            .send(expenseData);

        const response=await request(app)
            .get("/api/expenses/category/food");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0].category).toBe("Food");
    });

    test("should return empty array when no expenses exist", async ()=>{
        const response = await request(app)
            .get("/api/expenses");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toEqual([]);
    });
    
});