import React,{useState,useEffect} from 'react'; 
import EstablishCustomer from './EstablishCustomer';
import MaintainLicence from './MaintainLicence';
import Print from './Print';
import SurrenderLicence from './SurrenderLicence';
import SearchCustomer from './SearchCustomer';
import UpdateCustomer from './UpdateCustomer'

export default function Users(){

    const [customers,setcustomers] = useState([]);
    const[view,setview] = useState(4);
    const[content,setcontent] = useState({});
    const[surrenderReason,setsurrenderReason] = useState('');

    let views=[<EstablishCustomer addcustomer={addcustomer} changeview={changeview}/>
        , <MaintainLicence updatecustomer={updatecustomer} changeview={changeview}/>
        , <Print person={content} surrenderReason={surrenderReason} />
        , <SurrenderLicence updatecustomer={updatecustomer} setsurrenderReason={setsurrenderReason} changeview={changeview} />
        , <SearchCustomer  changeview={changeview} setcontent={setcontent}/>
        , <UpdateCustomer data={content} updatecustomer={updatecustomer}/>] 
    
    function changeview(v)
    {
        setview(v)
    }

    useEffect(()=>{
        if(customers.length === 0)
        {
            fetch('http://localhost:4000/api/customers')
            .then(response => response.json())
            .then(data=> {
                setcustomers(data);
                setcontent(data[0]);
            }); 
        }
    },[customers.length]); 


    function addcustomer(customer){
        setcontent(customer);
        setcustomers([...customers,customer]);
    }

    function updatecustomer(customer)
    {
        setcontent(customer);
        setcustomers(customers.map(c => (c.id === customer.id) ? c:customer));
    }
    return(
        <div style={{border:'1px solid red',padding:'5px',margin:'5px'}}>
            {views[view]}
            
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <button onClick={()=>setview(4)} style={{width:"50%", padding:'10px',margin:'5px'}}>Search Customer</button>
            </div>
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <button onClick={()=>setview(0)} style={{width:"50%", padding:'10px',margin:'5px'}}>Establish Customer</button>
            </div>
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <button onClick={()=>setview(1)} style={{width:"50%", padding:'10px',margin:'5px'}}>Maintain Licence</button>
            </div>
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <button onClick={()=>setview(3)} style={{width:"50%", padding:'10px',margin:'5px'}}>Surrendering Licence</button>
            </div>
            <div style={{padding:'5px',margin:'5px',display:"flex",justifyContent:"center"}}>
                <button onClick={()=>setview(2)} style={{width:"50%", padding:'10px',margin:'5px'}}>Print Customer</button>
            </div> 
            <p><strong>There are </strong>{customers.length} customers</p>
        </div>
      
    ); 
}