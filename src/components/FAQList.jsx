import React, { useState } from 'react';
import './FAQList.css';
const FAQs = [
  {
    question: "What divisions does the Department of Justice (DoJ) handle?",
    answer: "The Department of Justice (DoJ) under the Ministry of Law & Justice, Government of India, manages various judicial operations, including:\n- Building court infrastructure.\n- Establishing fast-track courts for sensitive cases.\n- Overseeing the eCourts Project to digitize judicial processes.\n- Providing legal aid and judicial officer training programs.",
  },
  {
    question: "How can I pay traffic fines online?",
    answer: "To pay traffic fines online, follow these steps:\n1. Visit the official government traffic portal.\n2. Enter your vehicle number and other necessary details.\n3. Choose your preferred payment method (credit/debit card, UPI, etc.).\n4. Complete the payment, and a receipt will be generated.\nYou can also use the chatbot to get a direct link to the portal for convenience.",
  },
  {
    question: "What is the process for e-filing a case in court?",
    answer: "E-filing allows you to submit legal documents to the court online. Here’s the general process:\n1. Register on the court's e-filing portal.\n2. Upload your case documents (petition, evidence, etc.).\n3. Pay the required court fees online.\n4. Submit the application, and you will receive an acknowledgment.\nThe chatbot can guide you through this process and provide the necessary links.",
  },
  {
    question: "What is a fast-track court?",
    answer: "A fast-track court is a specialized court established to expedite the trial of certain sensitive and high-priority cases, including those related to women, children, and serious crimes. The chatbot can provide information on the location and current operations of fast-track courts in your region.",
  },
  {
    question: "What are eCourts services?",
    answer: "eCourts services are part of the government initiative to digitize the judiciary. These services include:\n- Online case tracking and status updates.\n- E-filing of cases and documents.\n- Court case streaming (live broadcasting of court hearings).\nThe chatbot can provide specific links and guidance for using these services.",
  },
  {
    question: "What is Tele-Law, and how can I access it?",
    answer: "Tele-Law is a legal aid initiative that allows citizens to get free legal advice through telephonic consultations with a panel of lawyers. You can access Tele-Law services through the government’s dedicated portals or by contacting the chatbot for further assistance.",
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => setIsOpen(!isOpen);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={toggleAnswer}>
		<div>
        <strong>{question}</strong>
		</div>
		<div>
		{
			isOpen ?
			<h3 className="symbol">-</h3>
			: 
			<h3 className="symbol">+</h3>
		}
		</div>
      </div>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQList = () => {
  return (
    <div className="faq-list">
      <h2>Frequently Asked Questions</h2>
      {FAQs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQList;
