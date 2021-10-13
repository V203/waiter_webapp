const { Pool } = require("pg");
const { keys } = require("prelude-ls");
// eslint-disable-next-line no-undef
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb';
const pool = new Pool({
    connectionString
});


module.exports = function ServicesFactory() {
    async function addDays(paramDay,paramName){
        try {

            await pool.query(`insert into days(${paramDay}) values('${paramName}')`)
            
        } catch (error) {
            console.log(`addDays function error ==> ${error}`);
            
        }

    }
    let getSpecificDay = async (paramDay)=>{
        let results_
       let results =  await pool.query(`SELECT ${paramDay} FROM days`)
        results.rows.forEach((results)=>{results_ = Object.values(results)})
        
        return results_

    }
   
    return {
        addDays,
        getSpecificDay

    };
};