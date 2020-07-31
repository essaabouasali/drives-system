import React from 'react';
import Customers from './Customers';


export default function App() {
  return (
    <div style={{padding:'5px',margin:'5px'}}>
      <h1 style={{textAlign:"center",color:"red",fontFamily:'verdana',fontSize:'30px'}}>Service NSW Database</h1>
      <Customers />
    </div>
  );
}