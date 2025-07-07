import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const texts = {
  en: {
    title: 'Frequently Asked Questions',
    questions: [
      {
        question: 'What is climate?',
        answer: 'Climate refers to the average atmospheric conditions in a region over a long period.'
      },
      {
        question: 'How often is the weather information updated?',
        answer: 'We update the information in real-time to provide you with accurate and reliable data.'
      },
      {
        question: 'How can I understand different meteorological terms?',
        answer: 'There are glossaries where you can find definitions of common terms like temperature, humidity, and atmospheric pressure.'
      },
      {
        question: 'Why can weather predictions change?',
        answer: 'Meteorology is a complex science, and conditions can change rapidly, affecting predictions.'
      },
      {
        question: 'How is weather information collected?',
        answer: 'The APIs we use collect information through satellites and other advanced technologies to offer you the most accurate information possible.'
      },
      {
        question: 'Is the weather information you provide reliable?',
        answer: 'Yes, our data comes from trusted sources and professionals in the meteorological field.'
      },
      {
        question: 'What factors affect the climate in my region?',
        answer: 'Factors like latitude, altitude, proximity to water bodies, and ocean currents can influence the climate of a region.'
      },
      {
        question: 'What are the differences between climate and weather?',
        answer: 'Climate refers to average conditions in an area over the long term, while weather refers to atmospheric conditions at a specific moment.'
      },
      {
        question: 'How can I prepare for extreme weather conditions?',
        answer: 'We recommend consulting guides on safety during events like storms, hurricanes, or heatwaves, and always staying updated with weather alerts.'
      },
      {
        question: 'How does climate change affect current climate?',
        answer: 'Climate change is altering climate patterns, increasing the frequency and intensity of extreme weather events, and changing seasons in many regions.'
      },
    ]
  },
  es: {
    title: 'Preguntas Frecuentes',
    questions: [
      {
        question: 'Â¿QuÃ© es el clima?',
        answer: 'El clima se refiere a las condiciones atmosfÃ©ricas promedio en una regiÃ³n durante un perÃ­odo extenso.'
      },
      {
        question: 'Â¿Con quÃ© frecuencia actualizan la informaciÃ³n del clima?',
        answer: 'Actualizamos la informaciÃ³n en tiempo real para proporcionarte datos precisos y fiables.'
      },
      {
        question: 'Â¿CÃ³mo puedo entender los diferentes tÃ©rminos meteorolÃ³gicos?',
        answer: 'Existen glosarios donde encontrarÃ¡s definiciones de tÃ©rminos comunes como temperatura, humedad y presiÃ³n atmosfÃ©rica.'
      },
      {
        question: 'Â¿Por quÃ© la predicciÃ³n del clima puede cambiar?',
        answer: 'La meteorologÃ­a es una ciencia compleja y las condiciones pueden cambiar rÃ¡pidamente, lo que puede afectar las predicciones.'
      },
      {
        question: 'Â¿CÃ³mo se recopila la informaciÃ³n meteorolÃ³gica?',
        answer: 'Las APIs que empleamos recopilan informaciÃ³n mediante satÃ©lites y otras tecnologÃ­as avanzadas para ofrecerte la informaciÃ³n mÃ¡s precisa posible.'
      },
      {
        question: 'Â¿Es confiable la informaciÃ³n de clima que ofrecen?',
        answer: 'SÃ­, nuestros datos provienen de fuentes confiables y profesionales del sector meteorolÃ³gico.'
      },
      {
        question: 'Â¿QuÃ© factores afectan el clima en mi regiÃ³n?',
        answer: 'Los factores como la latitud, la altitud, la proximidad a cuerpos de agua y las corrientes oceÃ¡nicas pueden influir en el clima de una regiÃ³n.'
      },
      {
        question: 'Â¿QuÃ© diferencias hay entre clima y tiempo?',
        answer: 'El clima se refiere a las condiciones promedio en un Ã¡rea a largo plazo, mientras que el tiempo se refiere a las condiciones atmosfÃ©ricas en un momento especÃ­fico.'
      },
      {
        question: 'Â¿CÃ³mo puedo prepararme para condiciones climÃ¡ticas extremas?',
        answer: 'Te recomendamos consultar guÃ­as sobre seguridad ante fenÃ³menos como tormentas, huracanes o olas de calor, y siempre estar atento a las actualizaciones meteorolÃ³gicas.'
      },
      {
        question: 'Â¿CÃ³mo afecta el cambio climÃ¡tico al clima actual?',
        answer: 'El cambio climÃ¡tico estÃ¡ alterando patrones climÃ¡ticos, aumentando la frecuencia e intensidad de fenÃ³menos extremos y modificando las estaciones en muchas regiones.'
      },
    ]
  }
};
const Faq = () => {
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
      {t.questions.map((item, index) => (
        <Box
          key={index}
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
            <strong>{item.question}</strong> {item.answer}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default Faq;
