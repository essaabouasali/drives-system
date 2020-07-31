import React , {useState} from 'react';






export default function MaintainLicence(props){


    const[customerNumber,setCustomerNumber]=useState('');
    const[type,settype] = useState('Learner');
    const[yearsNumber,setyearsNumber]=useState(1); 

    function sendMaintainLicenceRequest(e){
        
        e.preventDefault();

        let customer = {customerNumber,type,yearsNumber};

        fetch('http://localhost:4000/api/renewlicence',{
            method :"POST",
            headers: { 'Content-Type': 'application/json'},
            body : JSON.stringify(customer)
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                props.updatecustomer(json.data);
                props.changeview(2);
            }else
            {
                alert("Customer not Exist");
            }
        })
    }

    return (
        <div style={{border:'1px solid blue',padding:'5px',margin:'5px'}}>
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <form>
                    <fieldset>
                        <legend style={{color:"blue" ,fontSize:"30px"}}>Maintain Licence Form: </legend>
                        <div>
                            <label>Customer Number</label> <br></br>
                            <input placeholder="Enter the Customer Number" onChange={(e) => setCustomerNumber(e.target.value) } value={customerNumber} required/>
                        </div> <br></br>
                        <div>
                            <label> Licence Type</label> <br></br>
                            <select onChange={(e) => settype(e.target.value)} value={type} required>
                                <option value="Learner">Learner</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                                <option value="Unristrected">Unristrected</option>
                            </select>
                        </div> <br></br>
                        <div>
                            <label>How Many years</label> <br></br>
                            <select onChange={(e) => setyearsNumber(e.target.value)} value={yearsNumber} required>
                                <option value="1">1</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div> <br></br>
                        <div>
                            <button onClick={sendMaintainLicenceRequest}>Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            {/* <div style={{border:'1px solid blue',padding:'20px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <button onClick={props.changeview}>Establish Costumer form</button>
            </div> */}
        </div>
    );

}