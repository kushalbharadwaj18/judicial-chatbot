import React from 'react';
import Header from './Header';
import SlidingImages from './SlidingImages';
import Footer from './Footer';
import Chatbot from './Chatbot';
import Content from './Content';
const Home = () => {
  return (
	<div>
	   <Header />
	   <SlidingImages />
	   <Content />
	   <Chatbot />
	   <Footer />
	</div>
  )
}

export default Home
