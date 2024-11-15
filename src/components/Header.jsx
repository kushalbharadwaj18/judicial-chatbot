import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
	<header>
	  <div className="images-div">
		<div className="embelem-image">
	  		<img src="https://doj.gov.in/wp-content/themes/sdo-theme/images/emblem.svg" />
			<div>
                <h3 className="image-title">न्याय विभाग</h3>
				<h4 className="image-title">DEPARTMENT OF JUSTICE</h4>
			</div>
		</div>
		<div className="web-images">
			<img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/2022/11/2022112837.png" />
			<img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/2021/08/2021081941.png" />
		</div>
	  </div>
	  <div>
	</div>
	<nav class="navbar">
            <ul>
                <li><Link to="#"><b>Home</b></Link></li>
                <li><Link to="#"><b>About Us</b></Link>
				   {/*
                    <ul class="dropdown">
                        <li><Link to="#">History</Link></li>
                        <li><Link to="#">About Department</Link></li>
                        <li><Link to="#">Vision and Mission</Link></li>
                        <li><Link to="#">Functions of Department</Link></li>
                        <li><Link to="#">Organization Chart</Link></li>
                        <li><Link to="#">Administrative Setup</Link></li>
                        <li><Link to="#">Who's Who</Link></li>
                        <li><Link to="#">Monthly Achievements</Link></li>
                        <li><Link to="#">Citizens’ Charter</Link></li>
                        <li><Link to="#">Acts and Rules</Link></li>
                        <li><Link to="#">Website Information Manager</Link></li>
                    </ul>
					*/}
                </li>
                <li><Link to="#"><b>Administration of Justice</b></Link></li>
                <li><Link to="#"><b>National Mission</b></Link></li>
                <li><Link to="#"><b>eCourts MMP</b></Link></li>
                <li><Link to="#"><b>Access to Justice</b></Link></li>
                <li><Link to="#"><b>Samvidhan@75</b></Link></li>
                <li><Link to="#"><b>Media Corner</b></Link></li>
            </ul>
        </nav>
	</header>
  )
}

export default Header
