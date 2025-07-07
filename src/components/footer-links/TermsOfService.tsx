import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const texts = {
  en: {
    title: 'Terms of Service',
    sections: {
      acceptance: {
        title: 'Acceptance of Terms',
        content: `By using temperaturein.com, you agree to these Terms of Service and our Privacy Policy. These terms apply to all users of the site, including visitors and anyone who accesses or uses the site in any way.`
      },
      use: {
        title: 'Use of the Website',
        content: `temperaturein.com provides a weather forecasting service based on the user's geographical location. We use the approximate location from which you visit us to provide you with more accurate weather forecasts`
      },
      restrictions: {
        title: 'Restrictions',
        content: `You may not use the website for any illegal or unauthorized purpose. You may not attempt to access systems or data that are not intended for you. You may not interfere with the operation of the website or attempt to bypass security measures.`
      },
      intellectualProperty: {
        title: 'Intellectual Property',
        content: `All content on the website, including text, graphics, logos, icons, and software, is the property of temperaturein.com or its licensors and is protected by intellectual property laws. Reproduction, distribution, modification, or creation of derivative works from the content is not allowed without our express authorization.`
      },
      disclaimer: {
        title: 'Disclaimer',
        content: `temperaturein.com strives to provide accurate and up-to-date weather information, but we do not guarantee that the information will always be accurate, complete, or current. Use of the information provided is at your own risk.`
      },
      thirdPartyServices: {
        title: 'Third Party Services',
        content: `The website may contain links to other websites or services provided by third parties. We are not responsible for the content, privacy policies, or practices of these sites. The inclusion of a link does not imply endorsement or approval of the linked site.`
      },
      modifications: {
        title: 'Modifications to the Service',
        content: `We reserve the right to modify, suspend, or discontinue the website or any part of it at any time without notice. We may also modify these Terms of Service. Changes will be posted on this page, and if significant, we will notify you through a notice on the site.`
      },
      limitationOfLiability: {
        title: 'Limitation of Liability',
        content: `To the maximum extent permitted by law, temperaturein.com will not be liable for any indirect, incidental, special, or consequential damages, including, but not limited to, loss of profits, data, or use, arising from the use or inability to use the website.`
      },
      indemnification: {
        title: 'Indemnification',
        content: `You agree to indemnify and hold harmless temperaturein.com, its affiliates, agents, etc from any claim, loss, damage, liability, cost, or expense (including reasonable legal fees) arising from your use of the website or your violation of these Terms of Service.`
      },
      governingLaw: {
        title: 'Governing Law and Jurisdiction',
        content: `These Terms of Service will be governed by and construed in accordance with the laws of [applicable country or state]. Any dispute arising in connection with these terms will be resolved in the competent courts of [applicable country or state].`
      },
      contact: {
        title: 'Contact',
        content: `If you have any questions about these Terms of Service, please contact us via email at: temperaturein@temperaturein.com.`
      },
      age: {
        title: 'Age of Users',
        content: `Our application is intended for users aged 13 and older. Although we do not collect identifiable personal information, we follow standard industry guidelines to ensure a safe online environment. Therefore, we recommend that children under 13 do not use our site. These measures are in line with international regulations to protect the privacy of minors. For more information on these regulations, please consult online resources.`
      }
    }
  },
  es: {
    title: 'TÃ©rminos del Servicio',
    sections: {
      acceptance: {
        title: 'AceptaciÃ³n de los TÃ©rminos',
        content: `Al utilizar temperaturein.com, aceptas estos TÃ©rminos del Servicio y nuestra PolÃ­tica de Privacidad. Estos tÃ©rminos se aplican a todos los usuarios del sitio, incluidos visitantes y cualquier persona que acceda o utilice el sitio de cualquier manera.`
      },
      use: {
        title: 'Uso del Sitio Web',
        content: `temperaturein.com proporciona un servicio de pronÃ³stico del clima basado en la ubicaciÃ³n geogrÃ¡fica del usuario. Utilizamos la localidad aproximada desde la que nos visitas para ofrecerte pronÃ³sticos del clima mÃ¡s precisos.`
      },
      restrictions: {
        title: 'Restricciones',
        content: `No debes utilizar el sitio web para ningÃºn propÃ³sito ilegal o no autorizado. No debes intentar acceder a sistemas o datos que no estÃ©n destinados para ti. No debes interferir con la operaciÃ³n del sitio web ni intentar eludir las medidas de seguridad.`
      },
      intellectualProperty: {
        title: 'Propiedad Intelectual',
        content: `Todo el contenido del sitio web, incluidos textos, grÃ¡ficos, logotipos, Ã­conos y software, es propiedad de temperaturein.com o sus licenciantes y estÃ¡ protegido por leyes de propiedad intelectual. No se permite reproducir, distribuir, modificar ni crear trabajos derivados del contenido sin nuestra autorizaciÃ³n expresa.`
      },
      disclaimer: {
        title: 'ExenciÃ³n de Responsabilidad',
        content: `temperaturein.com se esfuerza por proporcionar informaciÃ³n precisa y actualizada sobre el pronÃ³stico del clima, pero no garantizamos que la informaciÃ³n sea siempre precisa, completa o actual. El uso de la informaciÃ³n proporcionada es bajo tu propio riesgo.`
      },
      thirdPartyServices: {
        title: 'Servicios de Terceros',
        content: `El sitio web puede contener enlaces a otros sitios web o servicios proporcionados por terceros. No somos responsables del contenido, polÃ­ticas de privacidad o prÃ¡cticas de estos sitios. La inclusiÃ³n de un enlace no implica que respalden o aprueben el sitio enlazado.`
      },
      modifications: {
        title: 'Modificaciones del Servicio',
        content: `Nos reservamos el derecho de modificar, suspender o interrumpir el sitio web o cualquier parte del mismo en cualquier momento y sin previo aviso. TambiÃ©n podemos modificar estos TÃ©rminos del Servicio. Publicaremos los cambios en esta pÃ¡gina y, si los cambios son significativos, te notificaremos a travÃ©s de un aviso en el sitio.`
      },
      limitationOfLiability: {
        title: 'LimitaciÃ³n de Responsabilidad',
        content: `En la medida mÃ¡xima permitida por la ley, temperaturein.com no serÃ¡ responsable de ningÃºn daÃ±o indirecto, incidental, especial o consecuente, incluyendo, entre otros, la pÃ©rdida de beneficios, datos o uso, que surja del uso o incapacidad para usar el sitio web.`
      },
      indemnification: {
        title: 'IndemnizaciÃ³n',
        content: `Aceptas indemnizar y eximir de responsabilidad a temperaturein.com, sus afiliados, empleados, agentes, etc. de cualquier reclamaciÃ³n, pÃ©rdida, daÃ±o, responsabilidad, costo o gasto (incluidos honorarios legales razonables) que surjan de tu uso del sitio web o tu violaciÃ³n de estos TÃ©rminos del Servicio.`
      },
      governingLaw: {
        title: 'Ley Aplicable y JurisdicciÃ³n',
        content: `Estos TÃ©rminos del Servicio se regirÃ¡n e interpretarÃ¡n de acuerdo con las leyes del [paÃ­s o estado aplicable]. Cualquier disputa que surja en relaciÃ³n con estos tÃ©rminos se resolverÃ¡ en los tribunales competentes del [paÃ­s o estado aplicable].`
      },
      contact: {
        title: 'Contacto',
        content: `Si tienes alguna pregunta sobre estos TÃ©rminos del Servicio, no dudes en contactarnos a travÃ©s del correo electrÃ³nico: temperaturein@temperaturein.com.`
      },
      age: {
        title: 'Edad de los Usuarios',
        content: `Nuestra aplicaciÃ³n estÃ¡ destinada a usuarios de 13 aÃ±os en adelante. Aunque no recopilamos informaciÃ³n personal identificable, seguimos las pautas estÃ¡ndar de la industria para asegurar un entorno en lÃ­nea seguro. Por esta razÃ³n, recomendamos que los menores de 13 aÃ±os no utilicen nuestro sitio. Estas medidas estÃ¡n en lÃ­nea con las normativas internacionales para proteger la privacidad de los mÃ¡s jÃ³venes. Para obtener mÃ¡s informaciÃ³n sobre estas normas, te invitamos a consultar recursos disponibles en lÃ­nea.`
      }
    }
  }
};

const TermsOfService = () => {
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
export default TermsOfService;
