/* eslint-disable for-direction */


// const { param } = require("jquery");
const { Pool } = require("pg");
// consr ServicesFactory = require('./')
// eslint-disable-next-line no-undef
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb';
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});




module.exports = function ServicesFactory(pool) {


    async function addWaiter(paramName) {
        try {
            if (paramName !== undefined) {
                await pool.query(`insert into waiters(waiters_name) values('${paramName}')`);

            }
        } catch (error) {
            console.log(`addWaiter function error ${error}`);
        }


    }

    async function getWaiter(paramName) {
        try {
            if (paramName !== undefined) {
                let results = await pool.query(`select waiters_name from waiters where waiters_name = '${paramName}'`)

                return results.rows
            }
        } catch (error) {
            console.log(`Get waiter error==> ${error}`);
        }
    }


    async function addToWeek(paramName, paramArr) {
        try {
            if (paramName !== undefined && paramArr !== undefined) {
                paramName = await pool.query(`select * from waiters where waiters_name = '${paramName}'`);
                paramName = paramName.rows[0]['id']
                for (let i of paramArr) {
                    // console.log(paramName.rows)
                    await pool.query(`insert into shift(waiters_id, shift_days_id) values('${paramName}',${i})`)
                }



            }
        } catch (error) {
            console.log(`AddToWeek function ==> ${error}`);

        }

    }
    async function getShift(paramName) {
        try {
            if (paramName !== undefined) {
                let results = await pool.query(`select week.week_day from shift,week WHERE shift.shift_days_id = week.id`)
                return results.rows
            }
        } catch (error) {
            (`getShift function error ==> ${error}`)
        }

    }

    async function getDaysID(paramArr) {
        if (paramArr !== undefined) {
            let arr2 = await pool.query(`select id from week where id = ${paramArr}`)
            console.log(arr2);
            for (let i of paramArr) {

                await pool.query(`insert into waiters(waiters_name, waiters_day) values('${paramName}',${i})`)
            }
        }
        // return arr2
    }

    async function getAllFromSpecificDay(paramName) {
        try {
            let results = await pool.query(`select shift_days_id from shift where shift_days_id = ${paramName}`);
            return results.rows
        } catch (error) {
            console.log(`getAllFromSpecificDay function ==> ${error}`);
        }

    }
    async function getSelectDays() {
        try {
            let results = await pool.query(`SELECT week.week_day FROM shift,week WHERE shift.shift_days_id = week.id`);
            console.log(results.rows);
            return results.rows
        } catch (error) {
            console.log(`getSelectDays function error ==> ${error}`);
        }


    }
    async function getAllFromSpecificDay_V_II(paramDay) {
        try {
            let results = await pool.query(`SELECT week.week_day from week ,waiters,shift where shift.waiters_id = waiters.id`)
            return results.rows
        } catch (error) {
            console.log(`${error}`);
        }
    }



    return {

        addWaiter,
        getWaiter,
        addToWeek,
        getDaysID,
        getShift,
        getAllFromSpecificDay,
        getSelectDays,
        getAllFromSpecificDay_V_II


        };
    };