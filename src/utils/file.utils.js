const fs=require('fs').promises;
const path=require('path');

const filepath=path.join(__dirname, '../data/expenses.json');

async function readExpenses(){
    try {
            const data = await fs.readFile(filepath,"utf-8");
            return JSON.parse(data);
        } catch (err) {
            if (err.code === 'ENOENT') {
                await writeExpenses([]);
                return [];
            }
            throw err;
        }
}

async function writeExpenses(expenses){
    await fs.writeFile(
        filepath,
        JSON.stringify(expenses,null,2),
        "utf-8"
    );
}


module.exports={
    readExpenses,writeExpenses
}