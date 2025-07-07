import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux'; // AsegÃºrate de importar useSelector

const texts = {
  en: {
    title: 'Cookie Policy',
    sections: {
      introduction: {
        title: 'What Are Cookies?',
        content: `Cookies are small text files that are placed on your device when you visit a website. Cookies allow a website to recognize your device and store certain information about your preferences or activities while navigating the site.`
      },
      typesOfCookies: {
        title: 'What Cookies Do We Use?',
        content: `On TemperatureIn.com, we use cookies primarily through third-party tools to enhance your experience on the site. These tools include:
            Google Analytics: Collects data on how users interact with our website. Google Analytics uses cookies to gather information such as the number of visitors, the pages they visit, and the time spent on the site.
            Google Tag Manager: Manages and deploys tracking scripts. Google Tag Manager may use cookies to track interactions with the site.
            Google Search Console: Provides insights into our site's performance in Google search results.
            Although we do not use cookies directly on our site, the information provided may be linked to Google cookies.`
      },
      controlCookies: {
        title: 'How Can You Control Cookies?',
        content: `You can control and manage cookies through your browser settings. Most browsers allow you to:
              view cookies that have been set on your device,
              delete cookies,
              block third-party cookies,
              set alerts for when cookies are placed on your device.
                Keep in mind that blocking cookies may impact some functionalities of the website.`
      },
      changes: {
        title: 'Changes to This Policy',
        content: `We may update our cookie policy from time to time. Any changes will be posted on this page, and if significant, we will notify you through a notice on the site. We recommend checking this policy periodically for any updates.`
      },
      contact: {
        title: 'Contact Us',
        content: `If you have any questions about our Cookie Policy, please contact us at: temperaturein@temperaturein.com.`
      }
    }
  },
  es: {
    title: 'PolÃ­tica de Cookies',
    sections: {
      introduction: {
        title: 'Â¿QuÃ© Son las Cookies?',
        content: `Las cookies son pequeÃ±os archivos de texto que se colocan en tu dispositivo cuando visitas un sitio web. Las cookies permiten que un sitio web reconozca tu dispositivo y almacene cierta informaciÃ³n sobre tus preferencias o actividades mientras navegas por el sitio.`
      },
      typesOfCookies: {
        title: 'Â¿QuÃ© Cookies Utilizamos?',
        content: `En TemperatureIn.com, utilizamos cookies principalmente a travÃ©s de herramientas de terceros para mejorar tu experiencia en el sitio. Estas herramientas incluyen:
                      Google Analytics: Recopila datos sobre cÃ³mo los usuarios interactÃºan con nuestro sitio web. Google Analytics usa cookies para reunir informaciÃ³n como el nÃºmero de visitantes, las pÃ¡ginas que visitan y el tiempo que pasan en el sitio.
                      Google Tag Manager: Gestiona y despliega scripts de seguimiento. Google Tag Manager puede usar cookies para rastrear interacciones con el sitio.
                      Google Search Console: Proporciona informaciÃ³n sobre el rendimiento de nuestro sitio en los resultados de bÃºsqueda de Google. Aunque no utilizamos cookies directamente en nuestro sitio, la informaciÃ³n proporcionada puede estar vinculada a cookies de Google.`
      },
      controlCookies: {
        title: 'Â¿CÃ³mo Puedes Controlar las Cookies?',
        content: `Puedes controlar y gestionar las cookies a travÃ©s de la configuraciÃ³n de tu navegador. La mayorÃ­a de los navegadores te permiten:
                        ver las cookies que se han establecido en tu dispositivo,
                        eliminar cookies,
                        bloquear cookies de terceros,
                        configurar alertas para cuando se colocan cookies en tu dispositivo.
                        Ten en cuenta que bloquear cookies puede afectar algunas funcionalidades del sitio web.`
      },
      changes: {
        title: 'Cambios en Esta PolÃ­tica',
        content: `Podemos actualizar nuestra polÃ­tica de cookies de vez en cuando. Cualquier cambio se publicarÃ¡ en esta pÃ¡gina y, si es significativo, te notificaremos a travÃ©s de un aviso en el sitio. Te recomendamos revisar esta polÃ­tica periÃ³dicamente para estar al tanto de cualquier actualizaciÃ³n.`
      },
      contact: {
        title: 'Contacto',
        content: `Si tienes alguna pregunta sobre nuestra PolÃ­tica de Cookies, por favor contÃ¡ctanos a travÃ©s del correo electrÃ³nico: temperaturein@temperaturein.com.`
      }
    }
  }
};

const CookiePolicy = () => {
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
    </Box>
  );
};
export default CookiePolicy;
