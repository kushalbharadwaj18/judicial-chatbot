import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import AppContext from '../AppContext';
import * as jwtDecode from 'jwt-decode';
const Header = () => {
  const { user } = useContext(AppContext)  
  // const [option, setOption] = useState(() => {
  //   if (user === " ") {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // });
  // let u = null;
  // try {
  //   const storedUser = localStorage.getItem('user');
  //   u = storedUser ? JSON.parse(storedUser) : null;
  // } catch (error) {
  //   console.error("Error parsing user data from localStorage:", error);
  //   u = null; 
  // }
  const [u, setU] = useState(null);
  const token = localStorage.getItem('token');
  if (token) {
      try {
        const decoded = jwtDecode(token);
        const username = decoded.name;
        console.log(username);
        setU(username);
      }
      catch(error) {
        console.error('Invalid Token', error);
      }
  }

  return (
	<header>
	  <div className="images-div">
		<div className="embelem-image">
	  		<img src="https://doj.gov.in/wp-content/themes/sdo-theme/images/emblem.svg" class="w-16 h-20"/>
			<div class="relative bottom-3">
        <h3 className="image-title text-xl">न्याय विभाग</h3>
				<h4 className="image-title text-xl font-bold">DEPARTMENT&#160;OF&#160;JUSTICE</h4>
			</div>
		</div>
		<div className="web-images flex">
			<img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/2022/11/2022112837.png" class="w-30 h-20"/>
			<img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/2021/08/2021081941.png" class="w-30 h-20"/>
		</div>
	  </div>
	  <div>
	</div>
  {u == null ?
        (<nav className="navbar">
          <div>
            <Link to="/login" className="login-link">Log in</Link>
          </div>
          <div>
            <Link to="/signup" className="signup-link">Sign up</Link>
          </div>
    </nav>)
    : (<nav className="navbar"><img src="http://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" width="50" height="50" className="profile-image"/> <span className="username">{ u }</span></nav>)}
	</header>
  )
}
export default Header
