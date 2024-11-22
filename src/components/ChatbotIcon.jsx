import React from 'react';
import { Link } from 'react-router-dom';
import './ChatbotIcon.css';
const Chatbot = () => {
  return (
	<div>
	   {/* <p className="chatbot-icon"> */}
	    <div>
			<p className="chatbot-text">Ask&nbsp;Bot</p>
			<Link to="/chatbot"><img draggable="false" src="https://tse4.mm.bing.net/th?id=OIP.Jfe9OW2n6iPF9PjCsW1prgHaHa&pid=Api&P=0&h=180" className="chatbot-icon"/></Link>
		</div>
	   {/* </p>  */}
	</div>
  )
}
export default Chatbot