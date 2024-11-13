import React from 'react';
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
	</header>
  )
}

export default Header
