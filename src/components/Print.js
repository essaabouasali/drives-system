import React from 'react'




export default function Print(props)
{
    let customer = {...props.person.customer};
    let licence = {...props.person.licence};
    let dob;
    if(customer.dob !== undefined)
    {
         dob= new Date(customer.dob.year,Number(customer.dob.month)-1,customer.dob.day);
    }
    let issuedate;
    let expiry;
    let surrenderLicenceReason;
    if(props.person.licence === undefined)
    {
        licence.number = "NA";
        licence.type = "NA";
        issuedate ="NA";
        expiry="NA";
        licence.demritPoints="Na"
        surrenderLicenceReason = <p style={{color:"blue"}}> <strong style={{color:"black"}}>Licence has been surrendered for the reason of: </strong> {props.person.licenceSurrenderedReason} </p>;

    }
    else{
        issuedate = new Date(licence.issueDate.year,licence.issueDate.month,licence.issueDate.day);
        issuedate = issuedate.toLocaleDateString();
        expiry = new Date(licence.expiry.year,licence.expiry.month,licence.expiry.day);
        expiry = expiry.toLocaleDateString();
    }
    return(
        <div>
        { props.person && <div style={{ margin:"20px" , padding:"10px 0px" }}>
            <p style={{color:"blue"}}> <strong style={{color:"black"}}>Customer Name:   </strong> {customer.name}</p> <br></br>
            <p style={{color:"blue"}}> <strong style={{color:"black"}}>Customer Number :   </strong> {customer.customerNumber}</p><br></br>
            <p style={{color:"blue"}}> <strong style={{color:"black"}}>Customer Address:   </strong>  {customer.address}</p> <br></br>
            <p style={{color:"blue"}}> <strong style={{color:"black"}}>Customer Date Of Birth:</strong> {dob && dob.toString()} </p> <br></br>
            <p style={{color:"blue"}}> <strong style={{color:"black"}}>Licence Number:   </strong> {licence.number.toString()}</p> <br></br>
            <p style={{color:"blue"}}> <strong style={{color:"black"}}>Licence Type:   </strong> {licence.type}</p> <br></br>
            <p style={{color:"blue"}}> <strong style={{color:"black"}}>Licence first issue date:   </strong> {issuedate}</p> <br></br>
            <p style={{color:"blue"}}> <strong style={{color:"black"}}>Licence Expiry Date:   </strong> {expiry}</p> <br></br>
            <p style={{color:"blue"}}> <strong style={{color:"black"}}>Licence Demirt Point:   </strong> {licence.demritPoints}</p> <br></br>
            {surrenderLicenceReason} 
        </div> }
        </div>
    );
}