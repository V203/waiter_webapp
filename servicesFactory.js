const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb';
const pool = new Pool({
    connectionString
});


module.exports = function ServicesFactory() {

    var name = "";
    let everyDay = async () => {
        try {
            await pool.query(`SELECT * FROM days`);
        } catch (error) {
            console.log(`everyDay function error ==> : ${error}`);
        }

    };


    let getUserName = async () => {
        try {
            return name;
        } catch (error) {
            console.log(`getUserName function: ${error}`);
        }
    }

    let setUserName = async (param) => {
        try {
            name = param
        } catch (error) {
            console.log(`setUser function error : ${error}`);
        }

    }
    let addWaiter = async (userName, day) => {
        try {
            // userName = getUserName()
            await pool.query(`INSERT INTO days(${day}) values(${userName})`)
        }catch(error){
            console.log(`addWaiter function error :==: ${error}`);
        }
   }
    let removeWaiter = async () => {
        try {
            await pool.query(``)
        } catch (error) {
            console.log(`removeUser error function :==> ${error}`);
        }
    }
    let getSpecificDay = async (day) => {
        try {
            let results = await pool.query(`SELECT ${day} FROM days`)
            console.log(results.rows)
            return results.rows

        } catch (error) {
            console.log(`getSpecificDay function error  :==: ${error}`);

        }
    }
    const greetWaiter = async (param)=>{
        if(param !== undefined){
            return `Hello, ${param}`
        }
         

    }
    let superObjFun = async ()=>{
        // let mon = await pool.query(`select monday from days`)
        // await pool.query(`select tuesday from days`)
        // await pool.query(`select wednesday from days`)
        // await pool.query(`select thursday from days`)
        // await pool.query(`select friday from days`)
        // await pool.query(`select saturday from days`)
        // await pool.query(`select sunday from days`)

        // let daysObj = {}
        // daysObj.mon =
        // daysObj.tue =
        // daysObj.wed = 
        // daysObj.thur = 
        // daysObj.fri = 
        // daysObj.sat = 
        // daysObj.sun = 

    }

    return {
        everyDay, getUserName,
        setUserName, addWaiter,
        removeWaiter, getSpecificDay,
        greetWaiter, superObjFun
    };
};