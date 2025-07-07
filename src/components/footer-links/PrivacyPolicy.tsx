import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const formatContent = (content) => {
  
  return content.split('\n\n').map((paragraph, index) => (
    <Typography
      key={index}
      sx={{
        color: 'text.primary',
        fontSize: '1rem',
        lineHeight: 1.6,
        marginBottom: '15px'
      }}
    >
      {paragraph.split('\n').map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </Typography>
  ));
};
const texts = {
  en: {
    title: 'Privacy Policy',
    sections: {
      introduction: {
        title: 'Introduction',
        content: `At TemperatureIn.com, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, share, and protect your information when you use our website.`
      },
      dataCollection: {
        title: 'Data Collection',
        content: `1.1 Collected Information: When visiting TemperatureIn.com, we will evaluate your IP address via API to obtain the general location or approximate city (not exact) in order to provide you with an appropriate forecast (this will not be recorded). In conjunction with api.ipgeolocation.io, we will obtain information about the city to provide you with the weather forecast through the Meteosource API. This information is used exclusively to provide the weather forecast and is stored in your browser's local storage. It is not recorded or stored in any site database.\n\n1.2 Third-Party Information: The site is integrated with Google Analytics, Google Search Console, and Google Tag Manager. These services may collect information about your visits and activity on the site to provide us with analytics and improve our application. These services have their own privacy policies and data collection practices. You can review their policies via the following links:
          \n https://policies.google.com/privacy `
      },
      useOfInformation: {
        title: 'Use of Information',
        content: `The collected information is used solely to provide the weather forecast accurately and to improve the user experience. The location data is used only temporarily to look up the city and obtain the appropriate weather information.`
      },
      sharingOfInformation: {
        title: 'Sharing of Information',
        content: `The collected information is used only for the functionality of the application. We do not share your personal information with third parties, except with service providers that help deliver the weather forecast, such as the Meteosource API.`
      },
      securityOfInformation: {
        title: 'Security of Information',
        content: `We take reasonable measures to protect the information we collect, including using local storage in the browser and implementing standard security practices. We do not store or record user information in databases or send it to third parties.`
      },
      userRights: {
        title: 'User Rights',
        content: `Since we do not collect identifiable personal information, there is no data that needs to be accessed, corrected, or deleted. However, you can clear your browser history and local storage to remove any information that may be temporarily stored.`
      },
      cookies: {
        title: 'Cookies and Similar Technologies',
        content: `6.1 Use of Cookies and Similar Technologies: Our site uses local storage in the browser to temporarily store the list of searched cities, which is automatically deleted after one hour. We do not use persistent cookies or other tracking mechanisms in the browser.\n\n6.2 Managing Cookies: You can manage or disable local storage through your browser settings. For specific instructions on how to do this, consult your browserâ€™s documentation.`
      },
      policyUpdates: {
        title: 'Changes to the Privacy Policy',
        content: `We reserve the right to update this Privacy Policy at any time. We will post any changes on this page and, if the changes are significant, we will notify you through a notice on the site. It is your responsibility to periodically review this policy to stay informed about how we protect your information.`
      },
      contact: {
        title: 'Contact',
        content: `If you have any questions or concerns about this Privacy Policy, please do not hesitate to contact us via email at:
                    \n temperaturein@temperaturein.com`
      },
      age: {
        title: 'Age of Users',
        content: `Our application is intended for users aged 13 and older. Although we do not collect identifiable personal information, we follow standard industry guidelines to ensure a safe online environment. Therefore, we recommend that children under 13 do not use our site. These measures are in line with international regulations to protect the privacy of minors. For more information on these regulations, please consult online resources.`
      }
    }
  },
  es: {
    title: 'PolÃ­tica de Privacidad',
    sections: {
      introduction: {
        title: 'IntroducciÃ³n',
        content: `En TemperatureIn.com, valoramos tu privacidad y estamos comprometidos a proteger la informaciÃ³n personal que compartes con nosotros. Esta PolÃ­tica de Privacidad explica cÃ³mo recopilamos, usamos, compartimos y protegemos tu informaciÃ³n cuando utilizas nuestro sitio web.`
      },
      dataCollection: {
        title: 'RecopilaciÃ³n de InformaciÃ³n',
        content: `1.1 InformaciÃ³n Recopilada: Al visitar TemperatureIn.com, evaluaremos tu direcciÃ³n IP mediante API para obtener la ubicaciÃ³n general o ciudad aproximada (no exacta) y asÃ­ entregarte un pronÃ³stico adecuado (esta no se registrarÃ¡). En conjunto a api.ipgeolocation.io obtendremos info acerca de la ciudad para proporcionarte el pronÃ³stico del clima a travÃ©s de la API de Meteosource. Esta informaciÃ³n se utiliza exclusivamente para proporcionar el pronÃ³stico del clima y se conserva en el almacenamiento local de tu navegador. No se registra ni almacena en ninguna base de datos del sitio.\n\n1.2 InformaciÃ³n de Terceros: El sitio estÃ¡ integrado con Google Analytics, Google Search Console y Google Tag Manager. Estos servicios pueden recopilar informaciÃ³n sobre tus visitas y actividad en el sitio para proporcionarnos anÃ¡lisis y mejorar nuestra aplicaciÃ³n. Estos servicios tienen sus propias polÃ­ticas de privacidad y prÃ¡cticas de recopilaciÃ³n de datos. Puedes revisar sus polÃ­ticas a travÃ©s del siguiente enlace:
                        \n https://policies.google.com/privacy`
      },
      useOfInformation: {
        title: 'Uso de la InformaciÃ³n',
        content: `La informaciÃ³n recopilada se utiliza exclusivamente para proporcionar el pronÃ³stico del clima de manera precisa y para mejorar la experiencia del usuario. La data de ubicaciÃ³n solo es utilizada temporalmente para consultar la ciudad y obtener la informaciÃ³n meteorolÃ³gica adecuada.`
      },
      sharingOfInformation: {
        title: 'ComparticiÃ³n de la InformaciÃ³n',
        content: `La informaciÃ³n recopilada se utiliza Ãºnicamente para la funcionalidad de la aplicaciÃ³n. No compartimos tu informaciÃ³n personal con terceros, excepto con los proveedores de servicios que ayudan a entregar el pronÃ³stico del clima, como la API de Meteosource.`
      },
      securityOfInformation: {
        title: 'Seguridad de la InformaciÃ³n',
        content: `Tomamos medidas razonables para proteger la informaciÃ³n que recopilamos, incluyendo el uso de almacenamiento local en el navegador y la implementaciÃ³n de prÃ¡cticas de seguridad estÃ¡ndar. No almacenamos ni registramos informaciÃ³n de usuarios en bases de datos ni la enviamos a terceros.`
      },
      userRights: {
        title: 'Derechos de los Usuarios',
        content: `Dado que no recopilamos informaciÃ³n personal identificable, no hay datos que necesiten ser accesibles, corregidos o eliminados. Sin embargo, puedes borrar el historial de tu navegador y el almacenamiento local para eliminar cualquier informaciÃ³n que pueda estar almacenada temporalmente.`
      },
      cookies: {
        title: 'Cookies y TecnologÃ­as Similares',
        content: `6.1 Uso de Cookies y TecnologÃ­as Similares: Nuestro sitio utiliza almacenamiento local en el navegador para almacenar temporalmente la lista de ciudades buscadas, que se elimina automÃ¡ticamente despuÃ©s de una hora. No utilizamos cookies persistentes ni otros mecanismos de seguimiento en el navegador.\n\n6.2 GestiÃ³n de Cookies: Puedes gestionar o desactivar el almacenamiento local a travÃ©s de la configuraciÃ³n de tu navegador. Para instrucciones especÃ­ficas sobre cÃ³mo hacerlo, consulta la documentaciÃ³n del navegador que utilizas.`
      },
      policyUpdates: {
        title: 'Cambios en las PolÃ­ticas de Privacidad',
        content: `Nos reservamos el derecho de actualizar esta PolÃ­tica de Privacidad en cualquier momento. Publicaremos cualquier cambio en esta pÃ¡gina y, si los cambios son significativos, te notificaremos a travÃ©s de un aviso en el sitio. Es tu responsabilidad revisar periÃ³dicamente esta polÃ­tica para estar informado sobre cÃ³mo protegemos tu informaciÃ³n.`
      },
      contact: {
        title: 'Contacto',
        content: `Si tienes preguntas o inquietudes sobre esta PolÃ­tica de Privacidad, no dudes en contactarnos a travÃ©s del correo electrÃ³nico:
                          \n temperaturein@temperaturein.com`
      },
      age: {
        title: 'Edad de los Usuarios',
        content: `Nuestra aplicaciÃ³n estÃ¡ destinada a usuarios de 13 aÃ±os en adelante. Aunque no recopilamos informaciÃ³n personal identificable, seguimos las pautas estÃ¡ndar de la industria para asegurar un entorno en lÃ­nea seguro. Por esta razÃ³n, recomendamos que los menores de 13 aÃ±os no utilicen nuestro sitio. Estas medidas estÃ¡n en lÃ­nea con las normativas internacionales para proteger la privacidad de los mÃ¡s jÃ³venes. Para obtener mÃ¡s informaciÃ³n sobre estas normas, te invitamos a consultar recursos disponibles en lÃ­nea.`
      }
    }
  }
};

const PrivacyPolicy = () => {
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
            <strong>{section.title}:</strong>
            {formatContent(section.content)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default PrivacyPolicy;
