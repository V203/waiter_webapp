

const { Pool } = require("pg");

// eslint-disable-next-line no-undef
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb_test';
const pool = new Pool({
    connectionString
});


module.exports = function ServicesFactory() {
    async function addDays(paramName, paramDay) {
        try {
            
            await pool.query(` insert into waiters(name, shift) values('${paramName}','${paramDay}')`)

        } catch (error) {
            console.log(`addDays function error ==> ${error}`);

        }

    }
    async function getSpecificDay(paramDay) {

        try {

            var results = await pool.query(`select name from waiters where shift = '${paramDay}'`)
            return results.rows
        } catch (error) {
             `getSpecificDay function: ==> ${error}` 
            }


    }

    // let addWeek = () => {
    //     try {


    //     } catch (error) {
    //         console.log(`addWeek function error:==> ${error}`)
    //     }

    // }
    async function deleteDays(paramName) {
        await pool.query(`delete from waiters where name = '${paramName}'`)
    }
    async function addDays_vI(paramName, paramArr) {
        try {
            
            for(let i of paramArr){
                
                await pool.query(`insert into waiters(name, shift) values('${paramName}','${i}')`)
            }
            

        } catch (error) {
            console.log(`addDays function error ==> ${error}`);

        }
    }
    async function deleteAll() {
        try {
            await pool.query(`delete from waiters`)
        } catch (error) {
            console.log(`deleteAll function: ${error}`);
        }

    }
    async function getAllFromAday(paramDay,paramName){
     try{   let results_ =[]
       let results =  await pool.query(`SELECT * FROM waiters WHERE shift = '${paramDay}'`);
       for(let i in results.rows){
           
         results_.push(results.rows[i].name);
       }
    
       return results_
    }catch(error){
        console.log(`${error}`);
        }
}

    return {
        addDays,
        addDays_vI,
        getSpecificDay,
        deleteDays,
        deleteAll,
        getAllFromAday
        // addWeek

    };
};