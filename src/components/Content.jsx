import React from "react";
import './Content.css';
import FAQList from "./FAQList";
const Content = () => {
  return (
    <main>
	  <h2 className="heading">About Department</h2>
      <p className="about-content">
        About Department As per the Allocation of Business (Rules), 1961,
        Department of Justice is a part of Ministry of Law & Justice, Government
        of India. It is one of the oldest Ministries of the Government of India.
        Till 31.12.2009, Department of Justice was part of Ministry of Home
        Affairs and Union Home Secretary had been the Secretary of Department of
        Justice. Keeping in view the increasing workload and formulating many
        policies and programmes on Judicial Reforms in the country, a separate
        Department namely Department of Justice was carved out from MHA and
        placed under the charge of Secretary to Government of India and it
        started working as such from 1st January, 2010 under the Ministry of Law
        & Justice. The Department is housed in the Jaisalmer House, 26, Man
        Singh Road, New Delhi. The Organizational setup of the Department
        includes 04 Joint Secretaries, 08 Directors/ Deputy Secretaries and 09
        Under Secretaries. The functions of the Department of Justice include
        the appointment, resignation and removal of the Chief Justice of India,
        Judges of the Supreme Court of India, Chief Justices and Judges of the
        High Courts and their service matters. In addition, the Department
        implements important schemes for Development of Infrastructure
        Facilities for Judiciary, setting up of Special Courts for speedy trial
        and disposal of cases of sensitive nature (Fast Track Special Court for
        cases of rape and POCSO Act), E-court Project on computerization of
        various courts across the country, legal aid to poor and access to
        justice, financial assistance to National Judicial Academy for providing
        training to the Judicial Officers of the country. The functions of
        Department of Justice are given in Allocation of Business (Rules), 1961
      </p>
      <FAQList />
    <div className="additional-images">
      <div className="additional-image">
        <img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/bfi_thumb/2023062719-qnwyshxgesh19eti5lalf20xjoforz4lwp22koh71k.png" />
      </div>
      <div className="additional-image">
        <img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/bfi_thumb/2019032251-qnwxcqxc55mq29zmc801545c5zi6zvom4k1pe97hm0.png" />
      </div>
      <div className="additional-image">
        <img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/bfi_thumb/2019052222-qnwxcuoowhrvcpu5q9mjf376jiznuo3jh2nnbd1wx4.png" />
      </div>
      <div className="additional-image">
        <img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/bfi_thumb/2022111056-qnwyjdvs5lzypi20d5hsqut287cl5lyabldm33zld4.png" />
      </div>
      <div className="additional-image">
        <img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/bfi_thumb/2023013057-qnwylg515itm6p25bjlbpu2h5n6l1p52xswyzyxhpk.jpg" />
      </div>
      <div className="additional-image">
        <img src="https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/bfi_thumb/2019032217-qnwxcqxc55mq29zmc801545c5zi6zvom4k1pe97hm0.png" />
      </div>
    </div>
    </main>
  );
};

export default Content;
