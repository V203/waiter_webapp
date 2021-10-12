// exports.Routes = Routes;
// const { Pool } = require("pg");
// const ServicesFactory = require("./servicesFactory");

module.exports = function Routes(ServicesFactory){

	const home = async (req, res) => {  
        let servicesFactory = ServicesFactory(pool);    
		res.render('index', {                                             
		});       
	};

    const admin = async (req,res)=>{
        res.render(`admin`,{
        });
    };

    const waiter = async (req,res)=>{
        res.render(`waiter`,{
        });
    };
    

	return {
		home,admin,
        waiter
	};

}