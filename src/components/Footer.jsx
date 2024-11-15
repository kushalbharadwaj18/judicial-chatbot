import React from "react";
import './Footer.css';
const Footer = () => {
  return (
    <> 
      <footer>
      <div className="words-div">
        <p className="p-words">Website Policies / Hyperlinking Policy / Copyright Policy / Privacy Policy / Terms and Conditions / Feedback / Contact Us / Help / FAQ / WIM / Visitor Summary</p>
      </div>
      <div class="content-wrapper">
        <p class="content-text">Content Owned by DEPARTMENT OF JUSTICE, Ministry of Law and Justice, GOI</p>
        <p class="content-text">Developed and hosted by National Informatics Centre</p>
        <p class="content-text">Ministry of Electronics & Information Technology, Government of India</p>
        <p class="content-text">Last Updated: Nov 11, 2024</p>
        {/* <img src="https://doj.gov.in/wp-content/plugins/common_utility/images/certified-logo.png" alt="Certified Quality Website" class="logo" /> */}
        <div class="logo-wrapper">
            <img src="https://doj.gov.in/wp-content/themes/sdo-theme/images/s3waas.png" alt="SWAS" class="logo" />
            <img src="https://doj.gov.in/wp-content/themes/sdo-theme/images/nicLogo.png" alt="National Informatics Centre" class="logo" />
            <img src="https://doj.gov.in/wp-content/themes/sdo-theme/images/digitalIndia.png" alt="Digital India" class="logo" />
        </div>
    </div>
      </footer>
	  </>
  );
};

export default Footer;
