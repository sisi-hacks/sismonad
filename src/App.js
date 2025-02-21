import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import Trivia from './Trivia';
import Quest from './Quest';
import Puzzle from './Puzzle';

function App() {
  return (
    <Router>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Trivia />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/puzzle" element={<Puzzle />} />
        </Routes>
      </Layout>
      <Footer />
    </Router>
  );
}

export default App;