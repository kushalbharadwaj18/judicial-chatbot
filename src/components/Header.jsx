import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import AppContext from '../AppContext';
const Header = () => {
  const { user } = useContext(AppContext)  
  const [option, setOption] = useState(() => {
    if (user === null) {
      return true;
    }
    else {
      return false;
    }
  });
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
  {option ?
        <nav className="navbar">
          <div>
            <Link to="/login" className="login-link">Log in</Link>
          </div>
          <div>
            <Link to="/signup" className="signup-link">Sign up</Link>
          </div>
    </nav>
    : <nav className="navbar"><img src="http://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" width="50" height="50" className="profile-image"/> <span className="username">{ user }</span></nav>}
	</header>
  )
}

export default Header
