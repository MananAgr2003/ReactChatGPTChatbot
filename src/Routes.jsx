import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import Home from './Home';
import About from './About';

const RoutesFunc = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
        
    );
};

export default RoutesFunc;
