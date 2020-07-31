import React,{useState} from 'react'; 


export default function AddUser(props){

    const [name,setName] = useState(''); 
    const[address,setaddress]=useState('');
    const[dob,setdob]=useState('');
    

    function sendEstablishCustomerRequest(e){
        //stop the form from submitting and making a synchronous post request
        e.preventDefault(); 
        //instead we are making an asynchronous request using fetch
        let customer = { name, address, dob};

        if(name === '' && address==='' && dob==='')
        {
            alert('Please compleate the form');
        }
        else{
            fetch('http://localhost:4000/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(customer),
              })
                .then((response)=>response.json())
                .then(json=>{
                    if(json.status === 200){
                        
                        props.addcustomer(json.data);
                        props.changeview(2)
                    }
                    else{
                        alert("There was an error"); 
                    }           
                });  
        }
          
    }

    return(
        <div style={{border:'1px solid blue',padding:'5px',margin:'5px'}}>
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <form> 
                    <fieldset>
                        <legend style={{color:"blue" ,fontSize:"30px"}}>Establish Customer Form: </legend>
                        <div>
                            <label>Full Name</label> <br></br>
                            <input type="text" placeholder="enter name" onChange={(e)=> setName(e.target.value)} value={name} required/>
                        </div> <br></br>
                        <div>
                            <label>Address</label> <br></br>
                            <input type="text" placeholder="enter Address" onChange={(e)=> setaddress(e.target.value)} value={address} required/>
                        </div> <br></br>
                        <div>
                            <label>Date Of Birth</label> <br></br>
                            <input type="date" onChange={(e)=> setdob(e.target.value)} value={dob} required/>
                        </div> <br></br>
                        <button onClick={sendEstablishCustomerRequest}>submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )

}