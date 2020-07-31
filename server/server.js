let customers = require('./data/Customers.json'); 
const express = require('express');
//cors lets a client make a request to a server with a different url (even if it is just the port) i.e. localhost:3000 -> localhost:4000
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const storage = require('node-persist');


async function initStorage(){
    const storageOptions = {
        dir:'./data',
        stringify:JSON.stringify,
        parse:JSON.parse,
        encoding:'utf8',
        logging:false,
        ttl:false,
        expiredInterval: 2 * 60 * 1000,
        forgiveParseErrors:false
    };
    await storage.init(storageOptions);
    
    // for(let o of customers)
    // {
    //     await storage.setItem(o.id.toString(),o);
    // }
}

async function initServer(){


    const server = express(); 
    //tell express to use cors
    server.use(cors()); 
    server.use(express.json()); 
    server.use(bodyParser.json()); 

    server.get('/api/customers',async (request,response)=>{

        let listofcustomers = await storage.values();
        customers = listofcustomers;
        response.json(listofcustomers); 
    })

    server.post('/api/customers',async (request,response)=>{
        try{
            let name = request.body.name.trim(); 
            let address = request.body.address.trim();
            let dobstring =request.body.dob.trim();
            let dobarray = dobstring.split("-");
            let dob = {day:dobarray[2],month:dobarray[1],year:dobarray[0]};
            let customerNumber = Math.floor(Math.random() * 99999999);
            let highest = 0; 
            for(let i =0;i<customers.length;i++){
                if(customers[i].id > highest){
                    highest = customers[i].id; 
                }
            }
            let customer = {id:++highest,customer:{name,address,dob,customerNumber}}; 
            customers.push(customer); 
            await storage.setItem(customer.id.toString(),customer);
            response.json({data:customer,status:200}); 
        }
        catch(error){
            response.json({status:500}); 
        }
    
    });

    server.put('/api/customers/:id',async (req,res)=>{
        try{
            let key= req.params.id;
            let data = await storage.getItem(key);
            let d={...data,customer:req.body}
            await storage.updateItem(key,d);
            res.json({data:d,status:200})
        }
        catch(error)
        {
            res.json({status:500,error:error});
        }
    })

    server.post('/api/searchCustomer',(req,res) =>{ 
        try{
            let number = req.body.number.trim();
            let name = req.body.name.trim();
            let dob = req.body.dob.trim(); 
            let result = [];
            if(Number(number))
            {
                result.push(customers.find(c => c.customer.customerNumber === Number(number)));
            }
            else{
                if(dob !== '') // search by both
                {
                    result= customers.filter(c => c.customer.name.toLowerCase().includes(name.toLowerCase()))
                    .filter(c => `${c.customer.dob.year}-${c.customer.dob.month}-${c.customer.dob.day}`.includes(dob));
                }
                else{ // search by name
                    result= customers.filter(c => c.customer.name.toLowerCase().includes(name.toLowerCase()));
                }
            }
            res.json({data:result,status:200}); 
        }
        catch(error){
            res.json({status:500,error:error});
        }     
    });
   
    server.post('/api/SurrenderLicence',async (request,response) => {

        try{
            let licenceNumber = request.body.number.trim();
            let reason =request.body.reason.trim();
            let currentCustomer = customers.find(c => c.customer.customerNumber === Number(licenceNumber));
            if(currentCustomer.licence !== undefined)
            {
                delete currentCustomer.licence;
                currentCustomer.licenceSurrenderedReason=reason;
                await storage.updateItem(currentCustomer.id.toString(),currentCustomer);
                response.json({data:currentCustomer,status:200,surrenderReason:reason});
            }else
            {
                response.json({status:500});
            }

        }
        catch(error){
            response.json({status:500});
        }
    })
    server.post('/api/renewlicence',async (request,response)=>{
        try{

            let cusNumber = request.body.customerNumber.trim();
            let type = request.body.type.trim();
            let yearsNumber = request.body.yearsNumber;
            let demripoints;
            switch(type)
            {
                case "Unristrected":{demripoints="12"; break; }
                case "P1": {demripoints="4"; break; }
                case "P2": {demripoints="7"; break; }
                case "Learner": {demripoints="4"; break; }
                default : demripoints="";
            }
            let currentcustomer = customers.find(c => c.customer.customerNumber === Number(cusNumber));
            let now = new Date(); 
            let expiryDate = new Date(now.getFullYear() + Number(yearsNumber),now.getMonth(),now.getDate());
            if(currentcustomer.licence === undefined)
            {
                currentcustomer.licence = {
                    number:cusNumber,
                    type:type,
                    issueDate:{
                        day:now.getDate().toString(),
                        month:now.getMonth().toString(),
                        year:now.getFullYear().toString()
                    },
                    expiry:{
                        day:expiryDate.getDate().toString(),
                        month:expiryDate.getMonth().toString(),
                        year:expiryDate.getFullYear().toString()
                    },
                    demritPoints:demripoints
                }; 
            }
            else{
                currentcustomer.licence.expiry={
                    day:expiryDate.getDate().toString(),
                    month:expiryDate.getMonth().toString(),
                    year:expiryDate.getFullYear().toString()
                }
            }
            await storage.updateItem(currentcustomer.id.toString(),currentcustomer);
            response.json({data:currentcustomer,status:200}); 
        }
        catch(error){
            response.json({status:500});
        }
    })

    //first try to get the port number from environment variables, if it is not defined then set to default value 4000
    const PORT = process.env.PORT || 4000; 
    server.listen(PORT,()=>{
        console.log('The server is up and running and listening on port ' + PORT); 
    });

}

initStorage().then(()=>initServer());