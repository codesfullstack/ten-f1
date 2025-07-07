import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { useSelector } from 'react-redux';

const WeatherIcon = ({ icon }: { icon: string }) => {
  return <img src={icon} alt="Weather Icon" style={{ width: '50px', height: '50px' }} />;
};

type DailyProps = {
  daily?: {
    data: {
      day: string;
      weather: string;
      icon: number;
      summary: string;
      all_day?: {
        weather: string;
        icon: number;
        temperature: number;
        temperature_min: number;
        temperature_max: number;
        wind: {
          speed: number;
          dir: string;
          angle: number;
        };
        cloud_cover: {
          total: number;
        };
        precipitation: {
          total: number;
          type: string;
        };
      } | null;
      morning: any;
      afternoon: any;
      evening: any;
    }[];
  };
};

const dayTranslations: { [key: string]: string } = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'MiÃ©rcoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'SÃ¡bado',
  Sunday: 'Domingo',
};

const DailyCard: React.FC<DailyProps> = ({ daily }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = daily?.data.length || 0;
  const visibleItems = 1; // Mostrar 1 tarjeta a la vez para cada dÃ­a
  const cardWidth = 1680; // Ancho de cada tarjeta en pÃ­xeles
  const incrementoDesplazamiento = cardWidth;
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragEndX, setDragEndX] = useState<number | null>(null);
  const isSpanishLanguage = useSelector((state: any) => state.cities.isSpanishLanguage);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalItems - visibleItems));
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX !== null) {
      setDragEndX(e.touches[0].clientX);
    }
  };
  const handleTouchEnd = () => {
    if (dragStartX !== null && dragEndX !== null) {
      const difference = dragStartX - dragEndX;
      if (difference > 50) {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, totalItems - visibleItems));
      } else if (difference < -50) {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
      }
    }
    setDragStartX(null);
    setDragEndX(null);
  };
  
  return (
    <Box display="flex" alignItems="center" className="box-carousel-daily" sx={{ marginTop: '10px' }}>
      <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
        <ArrowBackIosNewIcon sx={{ color: "white" }} />
      </IconButton>
      <Box
        display="flex"
        overflow="hidden"
        width="100%"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        sx={{ cursor: 'grab', height: '250px' }}
      >
        <Box
          display="flex"
          sx={{
            transform: `translateX(-${(currentIndex * incrementoDesplazamiento / totalItems)}px)`,
            transition: 'transform 0.5s ease',
            width: `${incrementoDesplazamiento * totalItems}px`
          }}
        >
          {daily?.data.map((day, index) => {
            const iconUrl = `/weather_icons/set01/medium/${day.icon}.png`;  // Construir URL del icono
            const dayInEnglish = moment(day.day).format('dddd');
            const dayInCurrentLanguage = isSpanishLanguage ? dayTranslations[dayInEnglish] || dayInEnglish : dayInEnglish;
            return (
              <Card key={index} sx={{ flex: '0 0 230px', margin: '0 5px' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '8px',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',  // Cambia al color que desees al hacer hover
                      cursor: 'pointer',  // Cambia el cursor al estilo deseado (opcional)
                      transform: 'scale(1.02, 1.02 )',
                      transition: 'background-color 0.7s, transform 0.7s'  // AÃ±ade transiciones para las propiedades que cambian
                    }
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" style={{ margin: 'auto' }}>
                    {dayInCurrentLanguage}  { }
                  </Typography>
                  <div style={{ margin: 'auto', display: 'block' }}>
                    <WeatherIcon icon={iconUrl} /> { }
                  </div>
                  {day.all_day && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <ThermostatIcon style={{ marginRight: '8px' }} />
                        <Typography fontWeight="bold">{day.all_day.temperature_min.toFixed(0)}Â° / {day.all_day.temperature_max.toFixed(0)}Â°</Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <AirIcon style={{ marginRight: '8px' }} />
                        <Typography>{day.all_day.wind.speed} m/s, {` ${isSpanishLanguage ? day.all_day.wind.dir.replace(/W/g, 'O') : day.all_day.wind.dir} `} ({day.all_day.wind.angle}Â°)</Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <CloudIcon style={{ marginRight: '8px' }} />
                        <Typography>{day.all_day.cloud_cover.total}<span>%</span></Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <OpacityIcon style={{ marginRight: '8px' }} />
                        <Typography>{day.all_day.precipitation.total} mm
                          { }
                        </Typography>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
      <IconButton onClick={handleNext} disabled={currentIndex >= totalItems - visibleItems}>
        <ArrowForwardIosIcon sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};
export default DailyCard;
