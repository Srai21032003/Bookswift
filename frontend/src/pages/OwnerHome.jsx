import React from 'react';
import './HomePage.css';
import Navbar from '../../components/Navbar';
import OwnerFeature from '../../components/OwnerFeature';
function OwnerHome() {

    return (
      <div className="HomePage">
            <Navbar />
            <OwnerFeature />
            {/* <Featured/> */}
      </div>
    )
  }
  
  export default OwnerHome