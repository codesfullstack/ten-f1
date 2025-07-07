import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const texts = {
  en: {
    title: 'About Web Development',
    sections: {
      overview: {
        title: 'Overview',
        content: `This website has been designed with a current and efficient approach. The user interface was built using React and Material-UI to provide an intuitive and responsive experience.`
      },
      backend: {
        title: 'Backend Development',
        content: `For the backend development, we have used Node.js with Express, leveraging APIs that provide real-time weather data, as well as geolocation and IP APIs.`
      },
      coding: {
        title: 'Coding Practices',
        content: `We use Vite for an efficient development environment, JavaScript and TypeScript for clean and scalable code, Material-UI, CSS, Flexbox (responsiveness) to design attractive interfaces, React Router for navigation,
            React Redux for global state management, Props for communication between components, Properties for managing English and Spanish languages (detects countries with Spanish as a language and defaults to English for the rest of the countries), libraries for handling meta tags and SEO, React Draggable for interactivity in certain interfaces,
              React Hooks for state management, and Slices in Redux for organizing API calls.`
      },
      management: {
        title: 'Development Management',
        content: `Our development and production environments are managed using GitHub for version control, which allows us to efficiently track changes and enables more effective collaboration.`
      },
      technology: {
        title: 'Other Technologies',
        content: `We also have experience in technologies such as Angular, Java Spring Boot, Oracle, MySQL, and MongoDB, allowing us to adapt to various needs and focus on scalable solutions.`
      },
      contact: {
        title: 'Contact Us',
        content: `If you have any questions or needs regarding web development, we can help you. Write to us at temperaturein@temperaturein.com (Contact section).`
      }
    }
  },
  es: {
    title: 'Acerca de Desarrollo Web',
    sections: {
      overview: {
        title: 'DescripciÃ³n General',
        content: `Este sitio web ha sido diseÃ±ado con un enfoque actual y eficiente. La interfaz de usuario fue construida utilizando React y Material-UI, para ofrecer una experiencia intuitiva y responsiva.`
      },
      backend: {
        title: 'Desarrollo del Backend',
        content: `Para el desarrollo del backend, hemos empleado Node.js con Express, aprovechando APIs que nos ofrecen datos meteorolÃ³gicos en tiempo real y tambiÃ©n APIs de geolocalizaciÃ³n e IP.`
      },
      coding: {
        title: 'PrÃ¡cticas de CodificaciÃ³n',
        content: `Utilizamos Vite para un entorno de desarrollo eficiente, JavaScript y TypeScript para un cÃ³digo limpio y escalable, Material-UI, CSS, Flexbox (responsividad) para diseÃ±ar interfaces atractivas, React Router para la navegaciÃ³n,
                    React Redux en la gestiÃ³n del estado global, Props para la comunicaciÃ³n entre componentes, Properties para el manejo de idiomas Ingles y EspaÃ±ol (detecta paÃ­ses con idioma EspaÃ±ol y por defecto InglÃ©s para el resto de los paÃ­ses), librerÃ­as para manejo de meta tags y SEO, React Draggable para interactividad en ciertas interfaces,
                    React Hooks para gestionar el estado y Slices en Redux para organizar los llamadas a la API.`
      },
      management: {
        title: 'GestiÃ³n del Desarrollo',
        content: `Nuestros entornos de desarrollo y producciÃ³n estÃ¡n gestionados utilizando GitHub para el control de versiones, lo que nos permite hacer un seguimiento eficiente de los cambios, permitiendo asÃ­ una colaboraciÃ³n mÃ¡s efectiva.`
      },
      technology: {
        title: 'Otras TecnologÃ­as',
        content: `TambiÃ©n contamos con experiencia en tecnologÃ­as como Angular, Java Spring Boot, Oracle, MySQL y MongoDB, para adaptarnos a distintas necesidades y enfocarnos en soluciones escalables.`
      },
      contact: {
        title: 'ContÃ¡ctanos',
        content: `Si se te plantean dudas o necesidades acerca del desarrollo web, podemos ayudarte, escribenos a temperaturein@temperaturein.com (secciÃ³n Contacto).`
      }
    }
  }
};
const DevelopmentTalk = () => {
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
            backgroundColor: '#f9f9f9',
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
    </Box>
  );
};
export default DevelopmentTalk;
