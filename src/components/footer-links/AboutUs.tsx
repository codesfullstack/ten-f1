import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';
import { FaTwitter as Twitter, FaTiktok as Tiktok } from 'react-icons/fa';

const texts = {
  en: {
    title: 'About Us',
    sections: {
      mission: {
        title: 'Our Mission',
        content: `Welcome to TemperatureIn.com. Our goal is to provide accurate weather information for any city in the world.`
      },
      services: {
        title: 'Our Services',
        content: `Whether youâ€™re planning your day or preparing for a trip, weâ€™ve got you covered with the current weather, hourly forecasts, and daily outlooks.`
      },
      commitment: {
        title: 'Our Commitment',
        content: `To provide you with accurate weather insights for your daily life.`
      },
      appreciation: {
        title: 'Thank You',
        content: `We appreciate your choice of us as your weather resource. We are committed to providing you with accurate and timely data.`
      },
      engagement: {
        title: 'Stay Connected',
        content: `Explore our website and its features. We welcome your feedback and would love to know if there are any features you would like to see or if you have any suggestions.`
      },
      socialMedia: {
        title: 'Follow Us',
        content: `Don't forget to follow us on social media for weather-related updates! Add us to your favorites or bookmark this page for easy access. Subscribe to receive updates and weather tips!`
      }
    },
    socialMedia: {
      facebook: 'https://m.facebook.com/61565142717557/',
      instagram: 'https://www.instagram.com/www_temperaturein_com/',
      twitter: 'https://x.com/www_tempin_com',
      tiktok: 'https://www.tiktok.com/@www_temperaturein_com',
      youtube: 'https://www.youtube.com/@temperaturein'
    }
  },
  es: {
    title: 'Sobre Nosotros',
    sections: {
      mission: {
        title: 'Nuestra MisiÃ³n',
        content: `Bienvenido a TemperatureIn.com. Nuestro objetivo es proporcionar informaciÃ³n meteorolÃ³gica precisa para cualquier ciudad del mundo`
      },
      services: {
        title: 'Nuestros Servicios',
        content: `Ya sea que estÃ©s planificando tu dÃ­a o preparÃ¡ndote para un viaje, te cubrimos con el clima actual, pronÃ³sticos por horas y perspectivas diarias.`
      },
      commitment: {
        title: 'Nuestro Compromiso',
        content: `Brindarte perspectivas del clima acertadas para tu diario vivir.`
      },
      appreciation: {
        title: 'Agradecimiento',
        content: `Agradecemos que nos elijas como recurso meteorolÃ³gico. Nos comprometemos a ofrecerte datos precisos y oportunos.`
      },
      engagement: {
        title: 'Mantente Conectado',
        content: `Explora nuestro sitio web y sus caracterÃ­sticas. Danos tu opiniÃ³n y haznos saber si hay caracterÃ­sticas que quisieras ver o si tienes sugerencias.`
      },
      socialMedia: {
        title: 'SÃ­guenos',
        content: `Â¡No olvides seguirnos en redes sociales para obtener informaciÃ³n relacionada al clima! AgrÃ©ganos a tus favoritos o marca esta pÃ¡gina para un acceso fÃ¡cil.
                  Â¡SuscrÃ­bete para recibir actualizaciones y consejos meteorolÃ³gicos!`
      }
    },
    socialMedia: {
      facebook: 'https://m.facebook.com/61565142717557/',
      instagram: 'https://www.instagram.com/www_temperaturein_com/',
      twitter: 'https://x.com/www_tempin_com',
      tiktok: 'https://www.tiktok.com/@www_temperaturein_com',
      youtube: 'https://www.youtube.com/@temperaturein'
    }
  }
};

const AboutUs = () => {
  const [loaded, setLoaded] = useState(false);
  const isSpanishLanguage = useSelector((state) => state.cities.isSpanishLanguage);
  const locale = isSpanishLanguage ? 'es' : 'en';
  const t = texts[locale];
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Box
      sx={{
        maxWidth: '600px',
        width: '77%',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: 3,
        marginTop: {
          xs: '120px',
          sm: '120px',
          md: '50px'
        },
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'none' : 'translateX(20px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out',
        overflow: 'hidden'
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: 'black',
          fontSize: '1.6rem',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}
      >
        {t.title}
      </Typography>
      {Object.entries(t.sections).map(([key, section]) => (
        <Box
          key={key}
          sx={{
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
            backgroundColor: '#f9f9f9', // Fondo mÃ¡s oscuro para las secciones
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: '1rem',
              lineHeight: 1.6
            }}
          >
            <strong>{section.title}:</strong> {section.content}
          </Typography>
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        {Object.entries(t.socialMedia).map(([key, url]) => (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            key={key}
            style={{ marginRight: "10px" }}
          >
            {key === 'facebook' && <Facebook style={{ fontSize: "24px", color: "black" }} />}
            {key === 'instagram' && <Instagram style={{ fontSize: "24px", color: "black" }} />}
            {key === 'twitter' && <Twitter style={{ fontSize: "24px", color: "black" }} />}
            {key === 'tiktok' && <Tiktok style={{ fontSize: "24px", color: "black" }} />}
            {key === 'youtube' && <YouTube style={{ fontSize: "24px", color: "black" }} />}
          </a>
        ))}
      </Box>
    </Box>
  );
};
export default AboutUs;
