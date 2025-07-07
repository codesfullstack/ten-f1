import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Content from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/footer-links/Contact';
import AboutUs from './components/footer-links/AboutUs';
import PrivacyPolicy from './components/footer-links/PrivacyPolicy';
import TermsOfService from './components/footer-links/TermsOfService';
import CookiePolicy from './components/footer-links/CookiePolicy';
import DevelopmentTalk from './components/footer-links/DevelopmentTalk';
import Faq from './components/footer-links/Faq';

function App() {
  const [updateKey, setUpdateKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchBoxLoading, setIsSearchBoxLoading] = useState(false);
  const location = window.location.pathname;

  const handleContentLoaded = () => {
    setIsLoading(false);
  };

  const handleSearchBoxLoading = (loading: boolean) => {
    setIsSearchBoxLoading(loading);
  };

  return (
    <Router>
      <>
        {(isLoading || isSearchBoxLoading) && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Header updateKey={updateKey} onSearchBoxLoaded={handleSearchBoxLoading} />
        <Content
          setUpdateKey={setUpdateKey}
          onContentLoaded={handleContentLoaded}
        />

        <Routes>
          <Route
            path="/footer-about-us"
            element={location === '/footer-about-us' ? <AboutUs /> : null}
          />
          <Route
            path="/footer-form-contact"
            element={location === '/footer-form-contact' ? <Contact /> : null}
          />
          <Route
            path="/footer-privacy-policy"
            element={location === '/footer-privacy-policy' ? <PrivacyPolicy /> : null}
          />
          <Route
            path="/footer-terms-of-service"
            element={location === '/footer-terms-of-service' ? <TermsOfService /> : null}
          />
          <Route
            path="/footer-cookie-policy"
            element={location === '/footer-cookie-policy' ? <CookiePolicy /> : null}
          />
          <Route
            path="/footer-web-development"
            element={location === '/footer-web-development' ? <DevelopmentTalk /> : null}
          />
          <Route
            path="/footer-faq"
            element={location === '/footer-faq' ? <Faq /> : null}
          />
        </Routes>
        {!isLoading && <Footer />}
      </>
    </Router>
  );
}

export default App;