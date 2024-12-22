import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import AppContext from '../AppContext';
import decodeToken from './JwtDecode';
const Header = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser(decoded); // Store decoded data in state
      }
      else {
          console.warn('Invalid token detected, removing it from storage.');
          localStorage.removeItem('token');
      }
    }
  }, [])
  // console.log(user);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNationalMissionOpen, setNationalMissionOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleNationalMission = () => {
    setNationalMissionOpen(!isNationalMissionOpen);
  };
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
  <nav className="navbar">
        <div>
          <a href="/" className="home-link">Home</a>
        </div>
        <div className="dropdown-container">
          <button
            className="dropdown-toggle"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
          About
          </button>
          {isDropdownOpen && (
            <ul aria-hidden={!isDropdownOpen} className="sub-menu">
              <li>
                <a href="https://doj.gov.in/history/" tabIndex={0}>
                  History
                </a>
              </li>
              <li>
                <a href="https://doj.gov.in/about-department/" tabIndex={0}>
                  About Department
                </a>
              </li>
              <li>
                <a
                  href="https://doj.gov.in/about-department/vision-and-mission/"
                  tabIndex={0}
                >
                  Vision and Mission
                </a>
              </li>
              <li>
                <a
                  href="https://doj.gov.in/about-department/function-of-department/"
                  tabIndex={0}
                >
                  Functions of Department
                </a>
              </li>
             
              <li>
                <a href="https://doj.gov.in/acts-and-rules/" tabIndex={0}>
                  Acts and Rules
                </a>
              </li>
              <li>
                <a href="https://doj.gov.in/website-information-manager/" tabIndex={0}>
                  Website Information Manager
                </a>
              </li>
            </ul>
          )}
        </div>
        
        <div className="dropdown-container">
          <a href="/administration-of-justice" className="administrationofjustice-link">
          Administration Of Justice
          <span className="indicator"></span>
          </a>
          <ul className="sub-menu">
            <li><a href="https://doj.gov.in/list-of-high-court-judges/">List of High Court Judges</a></li>
            <li><a href="https://doj.gov.in/vacancy-position/">Vacancy Positions</a></li>
            <li><a href="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/2024/12/202412041816388432.pdf">List of Supreme Court Judges</a></li>
            <li><a href="https://doj.gov.in/latest-orders-of-appointment-transfer-etc/">Latest Orders of Appointment,Transfer etc.</a></li>
            <li><a href="https://dashboard.doj.gov.in/vacancy-position/high_court_benches.php">High Courts Principal Seats and Benches</a></li>
            <li><a href="https://doj.gov.in/memorandum-of-procedure-of-appointment-of-high-court-judges/">Memorandum of procedure of appointment of High Court Judges</a></li>
            <li><a href="https://doj.gov.in/memorandum-of-procedure-of-appointment-of-supreme-court-judges/">Memorandum of procedure of appointment of Supreme Court Judges</a></li>
          </ul>
        </div>
          <div className="dropdown-container">
            <button
              className="dropdown-toggle"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              Access to justice
            </button>
            {isDropdownOpen && (
              <ul className="sub-menu">
                <li><a href="https://www.tele-law.in/">Tele Law Portal</a></li>
                <li><a href="https://doj.gov.in/about/" target="_blank" rel="noopener noreferrer">About Tele Law</a></li>
                <li><a href="https://doj.gov.in/legal-literacy-legal-awareness/">Legal Literacy & Legal Awareness</a></li>
                <li><a href="https://doj.gov.in/webinar/" target="_blank" rel="noopener noreferrer">Webinars</a></li>
                <li><a href="https://doj.gov.in/digital-library/">Information in Different Language</a></li>
                <li><a href="https://doj.gov.in/access-to-justice-for-the-marginalized/" target="_blank" rel="noopener noreferrer">National Legal Services Authority(NALSA)</a></li>
                <li><a href="https://nalsa.gov.in/"></a>NALSA Portal</li>
              </ul>
            )}
          </div>
          <div className="dropdown-container">
            <button
              className="dropdown-toggle"
              onClick={toggleNationalMission}
              aria-expanded={isNationalMissionOpen}
            >
              National Mission
            </button>
            {isNationalMissionOpen && (
              <ul className="sub-menu">
                <li><a href="https://doj.gov.in/vision-document/">Vision Document</a></li>
                <li><a href="https://doj.gov.in/advisory-council/">Advisory Council</a></li>
                <li><a href="https://bhuvan-nyayavikas.nrsc.gov.in/" target="_blank" rel="noopener noreferrer">CSS Judicial Infrastructure – Nyaya Vikas</a></li>
                <li><a href="https://dashboard.doj.gov.in/eodb/" target="_blank" rel="noopener noreferrer">Ease of Doing Business</a></li>
                <li><a href="https://dashboard.doj.gov.in/gn/" target="_blank" rel="noopener noreferrer">Gram Nyayalaya</a></li>
                <li><a href="https://doj.gov.in/scheme-for-action-research-and-studies-on-judicial-reforms-5/">Scheme for Action Research and Studies on Judicial Reforms</a></li>
                <li><a href="https://dashboard.doj.gov.in/sanctiondata/index.php" target="_blank" rel="noopener noreferrer">Vacancy Position in District and Subordinate Courts</a></li>
              </ul>
            )}
          </div>
          <div className="dropdown-container">
            <button
              className="dropdown-toggle"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              Nyaya Bandhu
            </button>
            {isDropdownOpen && (
              <ul className="sub-menu">
                <li><a href="https://doj.gov.in/nyaya-bandhu-activities/">Nyaya Bandhu Activities</a></li>
                <li><a href="https://www.probono-doj.in/home/index">Nyaya Bandhu Portal</a></li>
                
              </ul>
            )}
          </div>
          
      </nav>
  {/* {!user ?
        (<nav className="navbar1">
          <div>
            <Link to="/login" className="login-link">Log in</Link>
          </div>
          <div>
            <Link to="/signup" className="signup-link">Sign up</Link>
          </div>
    </nav>)
    : (<nav className="navbar1"><img src="http://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" width="50" height="50" className="profile-image"/> <span className="username">{ user.name }</span></nav>)} */}
	</header>
  )
}
export default Header
