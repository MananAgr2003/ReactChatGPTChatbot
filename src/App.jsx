import React  , { useEffect } from 'react';
import Navbar from './Navbar';
import Section1 from './Section1';
import RoutesFunc from './Routes';
import Chatbot from './Chatbot';



export default function App() {

  return (
    <>
    <Navbar></Navbar>
    <RoutesFunc></RoutesFunc>
    {/* <Chatbot></Chatbot> */}
    </>
  )
}
