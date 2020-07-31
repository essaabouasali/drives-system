import React, {useState } from 'react';
import Print from "./Print";



export default function SearchCustomer(props){
    
    const[number,setnumber]=useState('');
    const[name,setname]=useState('');
    const[dob,setdob]=useState('');
    const[content,setcontent]=useState([]);

    let result={number,name,dob};

    function findRequest(e){

        e.preventDefault();
        
        if(name === "" && number === "")
        {
            alert("at least one has to be added");
        }else{
            fetch('http://localhost:4000/api/searchCustomer',{
                method:"Post",
                headers:{'Content-Type' : 'application/json'},
                body : JSON.stringify(result),
            })
            .then(response => response.json())
            .then(json=> {
                    if(json.status === 200)
                    {
                        setcontent(json.data);
                    }else{
                        alert(json.error)
                    }
                }
            );
        }
       
    }

    function selectCustomer(e){
        
        e.preventDefault();
        if(content.length === 1)
        {
            props.setcontent(content[0]);
            props.changeview(5);
        }
        else if(content.length > 1)
        {

            alert('Error: More than one customer has been found... Search again');
        }
        else{
            alert('Erro: Customer has not been found.. Search for customer');
        }
    }

    return(
        <div style={{border:'1px solid blue',padding:'5px',margin:'5px'}}>
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}> 
                <form>
                    <fieldset>
                        <legend style={{color:"blue" ,fontSize:"30px"}}>Search for Customer: </legend>
                        <div>
                            <label>Customer Number</label> <br></br>
                            <input type="text" placeholder="If you know it" onChange={(e) => {setnumber(e.target.value)}} value={number} />
                        </div> <br></br>
                        <div>
                            <label>Customer Name</label> <br></br>
                            <input type="text" placeholder="Enter Customer name" onChange={(e) => {setname(e.target.value)}} value={name} />
                        </div> <br></br>
                        <div>
                            <label>Customer Date of Birth</label> <br></br>
                            <input type="Date" onChange={(e) => {setdob(e.target.value)}} value={dob} />
                        </div> <br></br>
                        <div>
                           <button onClick={findRequest}>Search</button>
                        </div> <br></br>
                        <div>
                            <button onClick={selectCustomer}>Update Details</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div>
                {content.map(c => <Print key={c.id} person={c} />)}
            </div>
        </div>
    );
}