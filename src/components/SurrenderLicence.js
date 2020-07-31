import React ,{useState} from 'react'


export default function SurrenderLicence(props){


    const[number,setnumber] = useState('');
    const[reason , setreason]= useState('');

    function sentRequest(e)
    {
        e.preventDefault();


        let result={number,reason};
        fetch('http://localhost:4000/api/SurrenderLicence',{
            method:"Post",
            headers:{'Content-Type' : 'application/json'},
            body : JSON.stringify(result),
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                alert('Licence has been surrendered');
                props.setsurrenderReason(json.surrenderReason);
                props.updatecustomer(json.data);
                props.changeview(2);

            }else{
                alert('Customer is not exist..')
            }
        })
    }

    return(
        <div style={{border:'1px solid blue',padding:'5px',margin:'5px'}}>
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <form>
                    <fieldset>
                        <legend style={{color:"blue" ,fontSize:"30px"}}>Surrendering Licence Form: </legend>
                        <div>
                            <label>Licence Number</label> <br></br>
                            <input type="text" placeholder="Enter Licence Number" onChange={(e) => {setnumber(e.target.value)}} value={number} />
                        </div> <br></br>
                        <div>
                            <label> <strong>Select the reason why you surrendering the licence ? </strong></label> <br></br>
                            <input type="radio" value= "No longer Required" onChange={e => setreason(e.target.value)} checked={reason === "No longer Required"} /> 
                            <label>No longer Required</label> <br></br>
                            <input type="radio" value= "Moving oversease or interstate" onChange={e => setreason(e.target.value)} checked={reason === "Moving oversease or interstate"} /> 
                            <label>Moving oversease or interstate</label> <br></br>
                            <input type="radio" value= "Medical reason" onChange={e => setreason(e.target.value)} checked={reason === "Medical reason"} />
                            <label>Medical reason</label> <br></br>
                            <input type="radio" value= "Deceased" onChange={e => setreason(e.target.value)} checked={reason === "Deceased"} />
                            <label>Deceased</label> <br></br>
                        </div>
                        <div> <br></br>
                            <button onClick={sentRequest}>Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}