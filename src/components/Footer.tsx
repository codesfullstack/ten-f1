import { Container, Grid, Typography, Button, Divider } from "@mui/material";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import { FaTwitter as Twitter, FaTiktok as Tiktok } from 'react-icons/fa'; // Importa los Ã­conos necesarios
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const translations = {
  en: {
    aboutUs: "About Us",
    contact: "Contact",
    policiesAndLegal: "Policies and Terms",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",
    legalNotice: "Legal Notice",
    resourcesAndServices: "Resources and Services",
    faq: "FAQ",
    weatherData: "Weather Data",
    toolsAndApplications: "Tools and Applications",
    supportAndDonations: "Support and Donations",
    connectWithUs: "Follow Us",
    subscribe: "Subscribe",
    copyright: "All Rights Reserved",
    development: "About Web Development"
  },
  es: {
    aboutUs: "Acerca de Nosotros",
    contact: "Contacto",
    policiesAndLegal: "PolÃ­ticas y TÃ©rminos",
    privacyPolicy: "PolÃ­tica de Privacidad",
    termsOfService: "TÃ©rminos de Servicio",
    cookiePolicy: "PolÃ­tica de Cookies",
    legalNotice: "Aviso Legal",
    resourcesAndServices: "Recursos y Servicios",
    faq: "Preguntas Frecuentes",
    weatherData: "Datos MeteorolÃ³gicos",
    toolsAndApplications: "Herramientas y Aplicaciones",
    supportAndDonations: "Soporte y Donaciones",
    connectWithUs: "Siguenos",
    subscribe: "Suscribirse",
    copyright: "Todos los Derechos Reservados",
    development: "Acerca de Desarrollo Web"
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtenemos el aÃ±o actual
  const isSpanishLanguage = useSelector((state: any) => state.cities.isSpanishLanguage);
  const locale = isSpanishLanguage ? 'es' : 'en';
  const temperatureLabel = isSpanishLanguage ? 'TÂ°' : 'TÂ°';
 
  return (
    <footer style={{ backgroundColor: '#0F2E4E', padding: "40px 0", color: "#FFFFFFB3", textAlign: "left", marginTop: '10px' }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h5" style={{ marginBottom: "15px", color: "#FFFFFF" }}>
                {translations[locale].aboutUs}
              </Typography>
              { }
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <a
                  href="/footer-about-us"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {translations[locale].aboutUs}
                </a>
              </Typography>
              { }
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <a
                  href="/footer-form-contact"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {translations[locale].contact}
                </a>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h5" style={{ marginBottom: "15px", color: "#FFFFFF" }}>
                {translations[locale].policiesAndLegal}
              </Typography>
              { }
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <a
                  href="/footer-privacy-policy"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {translations[locale].privacyPolicy}
                </a>
              </Typography>
              { }
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <a
                  href="/footer-terms-of-service"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {translations[locale].termsOfService}
                </a>
              </Typography>
              { }
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <a
                  href="/footer-cookie-policy"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {translations[locale].cookiePolicy}
                </a>
              </Typography>
              { }
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h5" style={{ marginBottom: "15px", color: "#FFFFFF" }}>
                {translations[locale].resourcesAndServices}
              </Typography>
              { }
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <a
                  href="/footer-faq"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {translations[locale].faq}
                </a>
              </Typography>
              { }
              { }
              { }
              { }
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <a
                  href="/footer-web-development"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {translations[locale].development}
                </a>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h5" style={{ marginBottom: "15px", color: "#FFFFFF" }}>
                {translations[locale].connectWithUs}
              </Typography>
              <div style={{ alignItems: "center" }}>
                <a href="https://m.facebook.com/61565142717557/" target="_blank" style={{ marginRight: "10px" }}>
                  <Facebook style={{ color: "white", fontSize: "24px" }} />
                </a>
                <a href="https://www.instagram.com/www_temperaturein_com/" target="_blank" style={{ marginRight: "10px" }}>
                  <Instagram style={{ color: "white", fontSize: "24px" }} />
                </a>
                <a href="https://x.com/www_tempin_com" target="_blank" style={{ marginRight: "10px" }}>
                  <Twitter style={{ color: "white", fontSize: "24px" }} />
                </a>
                <a href="https://www.tiktok.com/@www_temperaturein_com" target="_blank" style={{ marginRight: "10px" }}>
                  <Tiktok style={{ color: "white", fontSize: "24px" }} />
                </a>
                <a href="https://www.youtube.com/@temperaturein" target="_blank">
                  <YouTube style={{ color: "white", fontSize: "24px" }} />
                </a>
              </div>
              { }
            </div>
          </Grid>
        </Grid>
        <Divider style={{ backgroundColor: 'white', marginTop: '18px' }} />
        <Typography variant="body2" style={{ textAlign: "left", marginTop: "18px", color: "#FFFFFF" }}>
          { }
          &copy;  {temperatureLabel} {currentYear}  | {translations[locale].copyright}
        </Typography>
      </Container>
    </footer>
  );
};
export default Footer;
