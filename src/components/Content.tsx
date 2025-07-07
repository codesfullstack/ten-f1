import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from "@mui/material";
import Hourly from "./content/Hourly";
import Current from "./content/Current";
import DailyCard from "./content/DailyCard";
import useWeatherPointSearch from '../hooks/useWeatherPoingQuery';
import usePlaceSearch from '../hooks/usePlaceSearch';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useWeatherDailySearch from '../hooks/useWeatherDailySearch';
import { useGetTimezoneInfoQuery } from '../slices/weatherApiSlice';
import { Helmet } from 'react-helmet'; // Importa Helmet
import { setLanguage } from '../actions/actions'; // Importa la acciÃ³n
import { useGetIpQuery } from '../slices/weatherApiSlice';
import HourlyTemperatureChart from './content/HourlyTemperatureChart';
import DailyTemperatureChart from './content/DailyTemperatureChart';

const countryAbbreviations = [
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'UY', 'VE', 'ES', 'GQ', 'PH'
];
const formatCountry = (country: string, isSpanishLanguage: boolean) => {
  if (!isSpanishLanguage) return country;
  const wordsToRemove = ["Republic", "of"];
  const formattedCountry = country
    .split(' ')
    .filter(word => !wordsToRemove.includes(word))
    .join(' ');
  return formattedCountry;
};

const Content = ({ setUpdateKey, onContentLoaded }) => {
  const location = useLocation();
  const [cityFromUrl, setCityFromUrl] = useState('');
  const selectedCity = useSelector((state: any) => state.cities.selectedCity);
  const navigate = useNavigate();
  const isSpanishLanguage = useSelector((state: any) => state.cities.isSpanishLanguage); // ObtÃ©n el estado del idioma
  const dispatch = useDispatch();
  const paramPlace = useSelector((state) => state.cities.paramPlace);
  const [isNewData, setIsNewData] = useState(false);
  const [currentPlaceSearch, setCurrentPlaceSearch] = useState(cityFromUrl);
  const [prevPlaceSearch, setPrevPlaceSearch] = useState(cityFromUrl);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const [hasSaved, setHasSaved] = useState(false); // Estado para controlar el registro
  
  useEffect(() => {
    if (paramPlace) {
      setCityFromUrl(paramPlace);
      setIsNewData(true);
      const [country, ...cityParts] = paramPlace.split(' ');
      const city = cityParts.join('-');
      const formattedCity = city.charAt(0).toLowerCase() + city.slice(1).toLowerCase();
      window.history.replaceState({}, '', `/temperature-in-${formattedCity}`);
      setCurrentPlaceSearch(paramPlace);
    }
  }, [paramPlace]);
  
  useEffect(() => {
    const path = location.pathname;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    const cityFromPath = lastPart.replace('temperature-in-', '');
    if (selectedCity) {
      setCityFromUrl(selectedCity.name);
      navigate(`/temperature-in-${selectedCity.name.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      setCityFromUrl(cityFromPath);
    }
  }, [selectedCity, location.pathname, navigate, setCityFromUrl]);
  const { data: ipResponse, errorIP, isLoadingIP } = useGetIpQuery(null);
  const ip = ipResponse?.ip;
  const { data: timezoneInfo, isLoading: timezoneLoading } = useGetTimezoneInfoQuery(ip ? { ipParam: { ip } } : null);
  
  useEffect(() => {
    if (timezoneInfo) {
      const isSpanish = countryAbbreviations.includes(timezoneInfo.geo.country_code2);
      dispatch(setLanguage(isSpanish)); // Despacha la acciÃ³n para actualizar el estado global
    }
  }, [timezoneInfo, dispatch]);
  
  useEffect(() => {
    const path = location.pathname;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    const cityFromPath = lastPart.replace('temperature-in-', '');
    if (selectedCity) {
      setCityFromUrl(selectedCity.name);
      const formattedCityName = selectedCity.name.toLowerCase().replace(/\s+/g, '-');
      if (path !== `/temperature-in-${formattedCityName}`) {
        navigate(`/temperature-in-${formattedCityName}`);
      }
    } else if (cityFromPath) {
      setCityFromUrl(cityFromPath);
    } else if (timezoneInfo && timezoneInfo.geo.city) {
      setCityFromUrl(timezoneInfo.geo.city);
      const formattedCityName = timezoneInfo.geo.city.toLowerCase().replace(/\s+/g, '-');
      if (path !== `/temperature-in-${formattedCityName}`) {
        navigate(`/temperature-in-${formattedCityName}`);
      }
    }
  }, [selectedCity, location.pathname, navigate, timezoneInfo]);
  
  useEffect(() => {
    if (selectedCity) {
      const formattedCity = selectedCity.name.toLowerCase().replace(/\s+/g, '-');
      setCurrentPlaceSearch(selectedCity.name);
      window.history.replaceState({}, '', `/temperature-in-${formattedCity}`);
    }
  }, [selectedCity]);
  const placeSearch = isNewData ? currentPlaceSearch : prevPlaceSearch || cityFromUrl;
  console.log("Place search:", placeSearch);
  const { places, isLoading: placeLoading } = usePlaceSearch(placeSearch);
  
  useEffect(() => {
    if (places.length > 0) {
      if (isNewData) {
        setIsNewData(false); // Desactiva la bandera
        setPrevPlaceSearch(currentPlaceSearch); // Actualiza el valor anterior
      }
    }
  }, [places, isNewData]);
  const cityData = selectedCity || places[0];
  
  const { weatherData: weatherDataCombo, isLoading: weatherLoadingCombo } = useWeatherPointSearch({
    lat: cityData?.lat,
    lon: cityData?.lon,
  });
  
  const { weatherDailyData: daily, isLoading, error } = useWeatherDailySearch({ place_id: cityData?.place_id });
  
  useEffect(() => {
    if (weatherDataCombo && weatherDataCombo.current) {
      const key = `myApp-${cityData.lat}-${cityData.lon}`;
      const cityInfo = {
        temperature: weatherDataCombo.current.temperature.toFixed(0),
        icon_num: weatherDataCombo.current.icon_num,
        name: cityData.name,
        adm_area1: cityData.adm_area1,
        country: cityData.country,
        lat: cityData.lat,
        lon: cityData.lon,
        place_id: cityData.place_id,
        expiry: Date.now() + 60 * 60 * 1000,
        timestamp: Date.now(),
      };
      try {
        if (isFirstSave) {
          const existingData = localStorage.getItem(`defaultCity`);
          if (!existingData || existingData !== JSON.stringify(cityInfo)) {
            localStorage.setItem(`defaultCity`, JSON.stringify(cityInfo));
          }
          setIsFirstSave(false);
        } else {
          const existingKeys = Object.keys(localStorage);
          const isDuplicate = existingKeys.some(existingKey => {
            return existingKey !== 'defaultCity' && existingKey.startsWith('city-') && existingKey.endsWith(`${cityData.lat}${cityData.lon}`);
          });
          if (!isDuplicate) {
            localStorage.setItem(key, JSON.stringify(cityInfo));
          }
        }
        setUpdateKey((prev) => prev + 1);
        setHasSaved(true);
      } catch (error) {
        console.error("Error al guardar en localStorage:", error);
      }
    }
  }, [weatherDataCombo, cityData, setUpdateKey, isFirstSave]);
  
  useEffect(() => {
    if (!placeLoading && !weatherLoadingCombo && !timezoneLoading && !isLoading) {
      onContentLoaded();
    }
  }, [placeLoading, weatherLoadingCombo, timezoneLoading, isLoading, onContentLoaded]);
  if (placeLoading || weatherLoadingCombo || timezoneLoading) {
    return null; // No renderiza el contenido mientras estÃ¡ cargando
  }
  const { current: currentWeather, hourly: hourlyWeather } = weatherDataCombo;
  if (!currentWeather) {
    return <p>No weather data available.</p>;
  }
  const commonKeywords = "temperaturein.com, temperaturein, temperature in";
  
  const descriptionText = isSpanishLanguage
    ? `PronÃ³stico del tiempo para ${cityData.name}, ${cityData.adm_area1}, ${formatCountry(cityData.country, isSpanishLanguage)}.`
    : `Weather information for ${cityData.name}, ${cityData.adm_area1}, ${cityData.country}.`;
  
    const keywordsText = isSpanishLanguage
    ? `${commonKeywords}, pronÃ³stico del tiempo, ${cityData.name} pronÃ³stico del tiempo, ${cityData.adm_area1} pronÃ³stico del tiempo, ${formatCountry(cityData.country, isSpanishLanguage)} pronÃ³stico del tiempo, clima actual, pronÃ³stico horario, pronÃ³stico diario, aplicaciÃ³n del clima, Ã­ndice UV, alertas meteorolÃ³gicas, temperatura en ${cityData.name}, 5 dÃ­as, 7 dÃ­as, 10 dÃ­as, 13 dÃ­as, 14 dÃ­as, 15 dÃ­as, clima severo, mapas del clima, noticias del clima, cambio climÃ¡tico, condiciones meteorolÃ³gicas, clima hoy, pronÃ³stico del tiempo a largo plazo, pronÃ³stico extendido, pronÃ³stico por hora, informaciÃ³n del clima, temperatura actual, tiempo en ${cityData.name}, ${cityData.name} clima`
    : `${commonKeywords}, weather, ${cityData.name} weather, ${cityData.adm_area1} weather, ${cityData.country} weather, current weather, weather forecast, hourly forecast, daily forecast, weather app, UV index, weather alerts, temperature in ${cityData.name}, 3 days, 4 days, 5 days, 7 days, 10 days, 12 days, 14 days, 15 days, 16 days, 20 days, 21 days, severe weather, weather maps, weather news, climate change, weather conditions, weather today, long-term weather forecast, extended forecast, weather information, current temperature, weather in ${cityData.name}`
  
  const baseUrl = window.location.origin;
  const imageUrl = `${baseUrl}/preview.jpg`;
  const latStr = cityData.lat.slice(0, -1); // Quitar Ãºltimo carÃ¡cter
  const lonStr = cityData.lon.slice(0, -1); // Quitar Ãºltimo carÃ¡cter
  const latDirection = cityData.lat.slice(-1); // Ãšltimo carÃ¡cter para latitud
  const lonDirection = cityData.lon.slice(-1); // Ãšltimo carÃ¡cter para longitud
  let lat = parseFloat(latStr);
  let lon = parseFloat(lonStr);
  if (latDirection === 'S') {
    lat = -lat;
  } // No hace falta nada para 'N', ya que es positivo
  if (lonDirection === 'W') {
    lon = -lon;
  } // No hace falta nada para 'E', ya que es positivo
  
  return (
    <main>
      <Helmet>
        <title>{descriptionText}</title>
        <meta name="description" content={descriptionText} />
        <meta name="keywords" content={keywordsText} />
        <meta property="og:title" content={`${cityData.name} - Weather`} />
        <meta property="og:description" content={descriptionText} />
        { }
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${cityData.name} - Weather`} />
        <meta name="twitter:description" content={descriptionText} />
        <meta name="twitter:image" content="URL_to_some_image" />
      </Helmet>
      <Box className="content">
        {places.length > 0 && (
          <Box>
            { }
          </Box>
        )}
        <Box
          sx={{
            background: 'linear-gradient(to right, #000000, #0f5E9a 70%)',
            padding: 2,
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            marginTop: { sm: '83px' },
            marginLeft: { xs: '5px', sm: '45px' },
            marginRight: { xs: '5px', sm: '40px' },
          }}
        >
          <Typography
            variant="h6" // Cambia el tipo de variante segÃºn tus necesidades
            color="white"
            align="left"
          >
            {cityData.name} - {cityData.adm_area1} - {formatCountry(cityData.country, isSpanishLanguage)}
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: { xs: '5px', sm: '45px' },
            marginRight: { xs: '5px', sm: '40px' },
            height: '250px'
          }}
        >
          <iframe
            title="Map of New York"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${(lon - 0.1).toFixed(6)},${(lat - 0.1).toFixed(6)},${(lon + 0.1).toFixed(6)},${(lat + 0.1).toFixed(6)}&layer=mapnik&marker=${lat},${lon}`}
            style={{ border: 0, width: '100%', height: '100%' }}
            loading="lazy"
          />
        </Box>
        {currentWeather && (
          <Box
            sx={{
              background: 'linear-gradient(to right, #52095f, rgb(33 132 207 / 0.5) 50%)',
              padding: 2,
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
              marginBottom: '10px',
              marginLeft: { xs: '5px', sm: '45px' },
              marginRight: { xs: '5px', sm: '40px' },
            }}
          >
            <Current current={currentWeather} />
          </Box>
        )}
        {hourlyWeather && <Hourly hourly={hourlyWeather} />}
        <HourlyTemperatureChart hourly={hourlyWeather.data} />
        <Divider sx={{ marginTop: '10px', borderTop: '2px solid white', margin: '10px auto', width: '70%' }} />
        {daily && <DailyCard daily={daily} />}
        <DailyTemperatureChart daily={daily} />
      </Box>
      { }
    </main>
  );
};
export default Content
