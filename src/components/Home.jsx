import React, { useContext } from 'react';
import Header from './Header';
import SlidingImages from './SlidingImages';
import Footer from './Footer';
import ChatbotIcon from './ChatbotIcon';
import Content from './Content';
const Home = () => {
  return (
	<div style={{"backgroundColor": "white"}}>
	   <Header />
	   <SlidingImages />
	   <Content />
	   <ChatbotIcon />
	   <Footer />
	</div>
  )
}
export default Home