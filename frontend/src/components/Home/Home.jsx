import React from 'react';
import HowItWorks from './HowItWorks';
import Whyus from './whyus/Whyus';
import Top from './top/Top';

function Home() {
  return (
    <>
      <Top /> 
      <HowItWorks />
      <Whyus /> 
    </>
  );
}

export default Home;