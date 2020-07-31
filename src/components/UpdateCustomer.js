import React, {useState} from 'react';
import Print from './Print';




export default function UpdateCustomer(props){


    const[name,setname]=useState('');
    const[address,setaddress]=useState('');
    const[dateofbirth,setdob]=useState('');
    const[content,setcontent]=useState(props.data)
    
    function sendUpdateRequest(e){

        e.preventDefault();
        let customerNumber= props.data.customer.customerNumber;
        let dob;
        
        if(dateofbirth === '')
        {
            dob = props.data.customer.dob;
        }
        else{
            let dateArray=dateofbirth.split("-");
            dob = {day:dateArray[2],month:dateArray[1],year:dateArray[0]};
        }
        let customer={name,address,dob,customerNumber};
        if(name === '')
        {
            customer.name= props.data.customer.name;
        } 
        if(address === '')
        {
            customer.address= props.data.customer.address;
        }
        let id=props.data.id;
        
        let s = 'http://localhost:4000/api/customers/'+id ;
        

        fetch(s,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(customer),
        })
        .then(response => { return response.json();})
        .then(json =>{
            if(json.status === 200)
            {
                props.updatecustomer(json.data);
                setcontent(json.data);
            }
            else{
                alert('error');
            }
        })
        .catch(error => {alert(JSON.stringify(error))});
    }

    return(
        <div style={{border:'1px solid blue',padding:'5px',margin:'5px'}}>
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <form>
                    <fieldset>
                        <legend style={{color:"blue" ,fontSize:"30px"}}>Update Customer Details</legend>
                        <div style={{margin:"10px",padding:"10px"}}>
                            <label>Full Name</label> <br></br>
                            <input type="text" onChange={(e) => setname(e.target.value)} value={name}  />
                        </div>
                        <div style={{margin:"10px",padding:"10px"}}>
                            <label>Address</label> <br></br>
                            <input type="text" onChange={(e) => setaddress(e.target.value)} value={address}  />
                        </div>
                        <div style={{margin:"10px",padding:"10px"}}>
                            <label>Date of Birth</label> <br></br>
                            <input type="date" onChange={(e) => setdob(e.target.value)} value={dateofbirth} />
                        </div>
                        <div style={{margin:"10px",padding:"10px"}}>
                            <button onClick={sendUpdateRequest}>Update</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div>
                <Print person={content}/>
            </div>
        </div>
    );

}