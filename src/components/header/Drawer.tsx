import React, { FunctionComponent, useEffect, useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListItemButton from '@mui/material/ListItemButton';
import { useGetCitiesMutation } from '../../slices/weatherApiSlice';
import { paramPlace } from '../../actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import { FaTwitter as Twitter, FaTiktok as Tiktok } from 'react-icons/fa';
import { Button } from '@mui/material';
import { selectCity } from '../../actions/actions';
const texts = {
  en: {
    continents: {
      Africa: 'Africa',
      Asia: 'Asia',
      Europe: 'Europe',
      'North America': 'North America',
      Oceania: 'Oceania',
      'South America': 'South America',
    },
    countries: {
      Africa: [
        'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
        'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros',
        'Congo (Congo-Brazzaville)', 'Democratic Republic of the Congo', 'Djibouti',
        'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon',
        'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya',
        'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania',
        'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria',
        'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone',
        'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo',
        'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
      ],
      Asia: [
        'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan',
        'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'India', 'Indonesia',
        'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait',
        'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia',
        'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine',
        'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea',
        'Sri Lanka', 'Syria', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkmenistan',
        'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'
      ],
      Europe: [
        'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus',
        'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus',
        'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia',
        'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan',
        'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova',
        'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland',
        'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia',
        'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom',
        'Vatican City'
      ],
      'North America': [
        'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada',
        'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador',
        'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico',
        'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia',
        'Saint Vincent and the Grenadines', 'United States'
      ],
      Oceania: [
        'Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia',
        'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa',
        'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'
      ],
      'South America': [
        'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador',
        'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'
      ]
    },
    footerLinks: {
      aboutUs: "About Us",
      contact: "Contact",
      policiesAndLegal: "Policies and Terms",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      resourcesAndServices: "Resources and Services",
      faq: "FAQ",
      development: "Let's Talk About Web Development",
      connectWithUs: "Follow Us",
      copyright: "All Rights Reserved",
    }
  },
  es: {
    continents: {
      Africa: 'Ãfrica',
      Asia: 'Asia',
      Europe: 'Europa',
      'North America': 'AmÃ©rica del Norte',
      Oceania: 'OceanÃ­a',
      'South America': 'AmÃ©rica del Sur',
    },
    countries: {
      Africa: [
        'Argelia', 'Angola', 'BenÃ­n', 'Botsuana', 'Burkina Faso', 'Burundi',
        'Cabo Verde', 'CamerÃºn', 'RepÃºblica Centroafricana', 'Chad', 'Comoras',
        'Congo (Congo-Brazzaville)', 'RepÃºblica DemocrÃ¡tica del Congo', 'Yibuti',
        'Egipto', 'Guinea Ecuatorial', 'Eritrea', 'Esuatini', 'EtiopÃ­a', 'GabÃ³n',
        'Gambia', 'Ghana', 'Guinea', 'Guinea-BisÃ¡u', 'Costa de Marfil', 'Kenia',
        'Lesoto', 'Liberia', 'Libia', 'Madagascar', 'Malawi', 'Mali', 'Mauritania',
        'Mauricio', 'Marruecos', 'Mozambique', 'Namibia', 'NÃ­ger', 'Nigeria',
        'Ruanda', 'Sao Tome y Principe', 'Senegal', 'Seychelles', 'Sierra Leona',
        'Somalia', 'SudÃ¡frica', 'SudÃ¡n del Sur', 'SudÃ¡n', 'Tanzania', 'Togo',
        'TÃºnez', 'Uganda', 'Zambia', 'Zimbabue'
      ],
      Asia: [
        'AfganistÃ¡n', 'Armenia', 'AzerbaiyÃ¡n', 'BarÃ©in', 'BangladÃ©s', 'ButÃ¡n',
        'BrunÃ©i', 'Camboya', 'China', 'Chipre', 'Georgia', 'India', 'Indonesia',
        'IrÃ¡n', 'Irak', 'Israel', 'JapÃ³n', 'Jordania', 'KazajistÃ¡n', 'Kuwait',
        'KirguistÃ¡n', 'Laos', 'LÃ­bano', 'Malasia', 'Maldivas', 'Mongolia',
        'Myanmar', 'Nepal', 'Corea del Norte', 'OmÃ¡n', 'PakistÃ¡n', 'Palestina',
        'Filipinas', 'Catar', 'Arabia Saudita', 'Singapur', 'Corea del Sur',
        'Sri Lanka', 'Siria', 'TayikistÃ¡n', 'Tailandia', 'Timor-Leste', 'TurkmenistÃ¡n',
        'Emiratos Ãrabes Unidos', 'UzbekistÃ¡n', 'Vietnam', 'Yemen'
      ],
      Europe: [
        'Albania', 'Andorra', 'Armenia', 'Austria', 'AzerbaiyÃ¡n', 'Bielorrusia',
        'BÃ©lgica', 'Bosnia y Herzegovina', 'Bulgaria', 'Croacia', 'Chipre',
        'RepÃºblica Checa', 'Dinamarca', 'Estonia', 'Finlandia', 'Francia', 'Georgia',
        'Alemania', 'Grecia', 'HungrÃ­a', 'Islandia', 'Irlanda', 'Italia', 'KazajistÃ¡n',
        'Letonia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Malta', 'Moldavia',
        'MÃ³naco', 'Montenegro', 'PaÃ­ses Bajos', 'Macedonia del Norte', 'Noruega', 'Polonia',
        'Portugal', 'Rumania', 'Rusia', 'San Marino', 'Serbia', 'Eslovaquia',
        'Eslovenia', 'EspaÃ±a', 'Suecia', 'Suiza', 'TurquÃ­a', 'Ucrania', 'Reino Unido',
        'Vaticano'
      ],
      'North America': [
        'Antigua y Barbuda', 'Bahamas', 'Barbados', 'Belice', 'CanadÃ¡',
        'Costa Rica', 'Cuba', 'Dominica', 'RepÃºblica Dominicana', 'El Salvador',
        'Granada', 'Guatemala', 'HaitÃ­', 'Honduras', 'Jamaica', 'MÃ©xico',
        'Nicaragua', 'PanamÃ¡', 'San CristÃ³bal y Nieves', 'Santa LucÃ­a',
        'San Vicente y las Granadinas', 'Estados Unidos'
      ],
      Oceania: [
        'Australia', 'Fiyi', 'Kiribati', 'Islas Marshall', 'Micronesia',
        'Nauru', 'Nueva Zelanda', 'Palaos', 'PapÃºa Nueva Guinea', 'Samoa',
        'Islas SalomÃ³n', 'Tonga', 'Tuvalu', 'Vanuatu'
      ],
      'South America': [
        'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador',
        'Guyana', 'Paraguay', 'PerÃº', 'Surinam', 'Uruguay', 'Venezuela'
      ]
    },
    footerLinks: {
      aboutUs: "Acerca de Nosotros",
      contact: "Contacto",
      policiesAndLegal: "PolÃ­ticas y TÃ©rminos",
      privacyPolicy: "PolÃ­tica de Privacidad",
      termsOfService: "TÃ©rminos de Servicio",
      cookiePolicy: "PolÃ­tica de Cookies",
      resourcesAndServices: "Recursos y Servicios",
      faq: "Preguntas Frecuentes",
      development: "Hablemos de Desarrollo Web",
      connectWithUs: "Siguenos",
      copyright: "Todos los Derechos Reservados"
    }
  },
};
const StyledCountryTypography = styled(Typography)<{ selected?: boolean }>(({ theme, selected }) => ({
  cursor: 'pointer',
  backgroundColor: selected ? theme.palette.primary.light : 'transparent',
  color: selected ? theme.palette.primary.contrastText : 'inherit',
  padding: '4px 8px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
const Drawer: FunctionComponent<{ open: boolean; onClose: () => void; onOpen: () => void; }> = ({ open, onClose, onOpen }) => {
  const isSpanishLanguage = useSelector((state) => state.cities.isSpanishLanguage);
  const locale = isSpanishLanguage ? 'es' : 'en';
  const t = texts[locale];
  const isLoading = true;
  const [expandedContinent, setExpandedContinent] = useState<string | false>(false);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [citiesData, setCitiesData] = useState<string[]>([]); // Estado para las ciudades
  const [citiesError, setCitiesError] = useState<any>(null); // Estado para manejar errores
  const [getCities] = useGetCitiesMutation();
  const currentYear = new Date().getFullYear();
  const temperatureLabel = isSpanishLanguage ? 'TÂ°en' : 'TÂ°in';
  const [accordionWidth, setAccordionWidth] = useState<number>(1260);
  const dispatch = useDispatch();
  const updateAccordionWidth = () => {
    const newWidth = Math.max(window.innerWidth - 35, 300); // Adjust minimum width as needed
    setAccordionWidth(newWidth);
  };
  useEffect(() => {
    updateAccordionWidth(); // Set initial width
    window.addEventListener('resize', updateAccordionWidth);
    return () => {
      window.removeEventListener('resize', updateAccordionWidth);
    };
  }, []);
  const handleContinentChange = (continent: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedContinent(isExpanded ? continent : false);
    setExpandedCountry(null);
    setCitiesData([]); // Reiniciar las ciudades al cambiar de continente
  };
  const getEnglishCountryName = (country: string, locale: string) => {
    const countriesInLocale = texts[locale].countries;
    const countriesInEnglish = texts.en.countries;
    for (const continent in countriesInLocale) {
      const index = countriesInLocale[continent].indexOf(country);
      if (index !== -1) {
        return countriesInEnglish[continent][index]; // Devuelve el nombre en inglÃ©s
      }
    }
    return country; // Manejo de errores simple
  };
  const handleCountryChange = async (country: string) => {
    const englishCountryName = getEnglishCountryName(country, locale); // Obtiene el nombre en inglÃ©s
    setExpandedCountry(country);
    try {
      const response = await getCities(englishCountryName).unwrap();
      setCitiesData(response.data); // Guardar los datos de las ciudades
      console.log("cities Data");
      console.log(response);
      setCitiesError(null); // Reiniciar errores
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCitiesError(error); // Manejar el error
      setCitiesData([]); // Limpiar datos en caso de error
    }
  };
  const handleCityClick = (city: string) => {
    console.log(`City selected: ${city}`);
    console.log("Closing drawer...");
    dispatch(selectCity(null));
    dispatch(paramPlace(city));
  };
  const getCountriesList = (continentKey: string) => {
    const countries = t.countries[continentKey];
    return isSpanishLanguage ? [...countries].sort() : countries; // Ordenar solo si estÃ¡ en espaÃ±ol
  };
  return (
    <SwipeableDrawer anchor="left" open={open} onClose={onClose} onOpen={onOpen}>
      <div role="presentation">
        <ListItemButton
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            background: 'linear-gradient(to right, #000000, #0f5E9a 50%)',
            padding: '10px',
            marginRight: '10px'
          }}
          onClick={onClose}
        >
          { }
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <img src="/temp.png" alt="close" style={{ width: '24px', height: '24px', }} />
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close" sx={{ marginRight: '0px', color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </ListItemButton>
        <List>
          {Object.entries(t.continents).map(([key, continent]) => (
            <Accordion key={key} expanded={expandedContinent === continent} onChange={handleContinentChange(continent)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                  {continent}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  {getCountriesList(key).map((country) => (
                    <Grid item xs={6} sm={4} md={2} key={country}>
                      <StyledCountryTypography
                        variant="body2"
                        onClick={() => handleCountryChange(country)}
                        style={{ width: '100%' }}
                      >
                        {country}
                      </StyledCountryTypography>
                      {expandedCountry === country && (
                        <Accordion
                          expanded={expandedCountry === country}
                          onChange={() => setExpandedCountry(expandedCountry === country ? null : country)}
                          style={{
                            width: `${accordionWidth}px`,
                            marginTop: '10px',
                            position: 'absolute',
                            left: 18,
                            zIndex: 1,
                          }}
                        >
                          <AccordionSummary>
                            <ExpandMoreIcon />
                            <Typography variant="body1" style={{ fontWeight: 600 }}>
                              {country}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails style={{ width: '100%' }}>
                            <Grid container spacing={1} style={{ width: '100%' }}>
                              {citiesData.length > 0 ? (
                                citiesData.map((city) => {
                                  const englishCountryName = getEnglishCountryName(country, locale);
                                  const parameter = `${englishCountryName} ${city}`;
                                  return (
                                    <Grid item xs={6} sm={4} md={2} key={city} onClick={onClose}>
                                      <StyledCountryTypography
                                        variant="body2"
                                        onClick={() => handleCityClick(parameter)}
                                        style={{ width: '100%' }}
                                      >
                                        <span style={{ cursor: 'pointer' }}>
                                          {city}
                                        </span>
                                      </StyledCountryTypography>
                                    </Grid>
                                  );
                                })
                              ) : (
                                <Grid item xs={12}>
                                  {isLoading ? (
                                    <Grid container alignItems="left" justifyContent="left">
                                      <Typography variant="body2" textAlign="left">
                                        {locale === 'es' ? 'Cargando lista de ciudades ... ' : 'Loading cities list ...'}
                                        <CircularProgress size={20} style={{ marginRight: '8px' }} />
                                      </Typography>
                                    </Grid>
                                  ) : (
                                    <Typography variant="body2" textAlign="left">
                                      No cities available
                                    </Typography>
                                  )}
                                </Grid>
                              )}
                            </Grid>
                            {citiesError && (
                              <Grid item xs={12}>
                                <Typography variant="body2" color="error" textAlign="left">
                                  Error fetching cities: {citiesError.message}
                                </Typography>
                              </Grid>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
        <Divider style={{ backgroundColor: '#000000', height: '2px', marginTop: '-8px' }} />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h8" style={{ fontWeight: 600 }}>
              {t.footerLinks.aboutUs}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ marginTop: '-15px' }}>
            <Typography style={{ fontSize: '0.92rem' }}>
              <a href="/footer-about-us" style={{ textDecoration: 'none', color: 'inherit' }}>
                {t.footerLinks.aboutUs}
              </a>
            </Typography>
            <Typography style={{ fontSize: '0.92rem' }}>
              <a href="/footer-form-contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                {t.footerLinks.contact}
              </a>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h8" style={{ fontWeight: 600 }}>
              {t.footerLinks.policiesAndLegal}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ marginTop: '-15px' }}>
            <Typography style={{ fontSize: '0.92rem' }}>
              <a href="/footer-privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
                {t.footerLinks.privacyPolicy}
              </a>
            </Typography>
            <Typography style={{ fontSize: '0.92rem' }}>
              <a href="/footer-terms-of-service" style={{ textDecoration: 'none', color: 'inherit' }}>
                {t.footerLinks.termsOfService}
              </a>
            </Typography>
            <Typography style={{ fontSize: '0.92rem' }}>
              <a href="/footer-cookie-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
                {t.footerLinks.cookiePolicy}
              </a>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h8" style={{ fontWeight: 600 }}>
              {t.footerLinks.resourcesAndServices}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ marginTop: '-15px' }}>
            <Typography style={{ fontSize: '0.92rem' }}>
              <a href="/footer-faq" style={{ textDecoration: 'none', color: 'inherit' }}>
                {t.footerLinks.faq}
              </a>
            </Typography>
            <Typography style={{ fontSize: '0.92rem' }}>
              <a href="/footer-web-development" style={{ textDecoration: 'none', color: 'inherit' }}>
                {t.footerLinks.development}
              </a>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Divider style={{ marginTop: '-0px', backgroundColor: '#000000', height: '2px' }} />
        { }
        <Accordion disableGutters>
          <AccordionSummary expandIcon={null} style={{ padding: '0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h8" style={{ fontWeight: 600, marginBottom: '10px', marginLeft: '15px' }}>
                {t.footerLinks.connectWithUs}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
                <a href="https://m.facebook.com/61565142717557/" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                  <Facebook style={{ color: "black", fontSize: "24px" }} />
                </a>
                <a href="https://www.instagram.com/www_temperaturein_com/" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                  <Instagram style={{ color: "black", fontSize: "24px" }} />
                </a>
                <a href="https://x.com/www_tempin_com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                  <Twitter style={{ color: "black", fontSize: "24px" }} />
                </a>
                <a href="https://www.tiktok.com/@www_temperaturein_com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                  <Tiktok style={{ color: "black", fontSize: "24px" }} />
                </a>
                <a href="https://www.youtube.com/@temperaturein" target="_blank" rel="noopener noreferrer">
                  <YouTube style={{ color: "black", fontSize: "24px" }} />
                </a>
              </div>
            </div>
          </AccordionSummary>
          <Typography variant="body2" style={{ textAlign: "left", marginTop: "18px", color: "#FFFFFF", marginLeft: '15px' }}>
            &copy; {currentYear} {temperatureLabel}. {t.footerLinks.copyright}
          </Typography>
        </Accordion>
        { }
        <Accordion disableGutters>
          <AccordionSummary expandIcon={null} style={{ padding: '0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '-30px', marginBottom: '-25px' }}>
              <Typography variant="body2" style={{ textAlign: "left", marginTop: "18px", color: "black", marginLeft: '15px' }}>
                &copy; {currentYear} {temperatureLabel}. {t.footerLinks.copyright}
              </Typography>
            </div>
          </AccordionSummary>
        </Accordion>
      </div>
    </SwipeableDrawer>
  );
};
export default Drawer;
