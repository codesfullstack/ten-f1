import { Box, Typography } from "@mui/material";
import moment from "moment";
import AirIcon from '@mui/icons-material/Air';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSelector } from 'react-redux';

const dayTranslations: { [key: string]: string } = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'MiÃ©rcoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'SÃ¡bado',
  Sunday: 'Domingo',
};

const monthTranslations: { [key: string]: string } = {
  January: 'Enero',
  February: 'Febrero',
  March: 'Marzo',
  April: 'Abril',
  May: 'Mayo',
  June: 'Junio',
  July: 'Julio',
  August: 'Agosto',
  September: 'Septiembre',
  October: 'Octubre',
  November: 'Noviembre',
  December: 'Diciembre',
};

const translationMap = {
  "Not available": "No disponible",
  "Sunny": "Soleado",
  "Mostly sunny": "Mayormente soleado",
  "Partly sunny": "Parcialmente soleado",
  "Mostly cloudy": "Mayormente nublado",
  "Cloudy": "Nublado",
  "Overcast": "Cubierto",
  "Overcast with low clouds": "Cubierto con nubes bajas",
  "Fog": "Niebla",
  "Light rain": "Lluvia ligera",
  "Rain": "Lluvia",
  "Possible rain": "Posible lluvia",
  "Rain shower": "ChaparrÃ³n",
  "Thunderstorm": "Tormenta elÃ©ctrica",
  "Local thunderstorms": "Tormentas locales",
  "Light snow": "Nieve ligera",
  "Snow": "Nieve",
  "Possible snow": "Posible nieve",
  "Snow shower": "ChaparrÃ³n de nieve",
  "Rain and snow": "Lluvia y nieve",
  "Possible rain and snow": "Posible lluvia y nieve",
  "Freezing rain": "Lluvia congelada",
  "Possible freezing rain": "Posible lluvia congelada",
  "Hail": "Granizo",
  "Clear": "Despejado",
  "Mostly clear": "Mayormente despejado (noche)",
  "Partly clear": "Parcialmente despejado",
  "Mostly cloudy (night)": "Mayormente nublado (noche)",
  "Cloudy (night)": "Nublado (noche)",
  "Overcast with low clouds (night)": "Cubierto con nubes bajas (noche)",
  "Rain shower (night)": "ChaparrÃ³n (noche)",
  "Local thunderstorms (night)": "Tormentas locales (noche)",
  "Snow shower (night)": "ChaparrÃ³n de nieve (noche)",
  "Rain and snow (night)": "Lluvia y nieve (noche)",
  "Possible freezing rain (night)": "Posible lluvia congelada (noche)"
};

const Current = ({ current }) => {
  const { temperature, summary, wind, icon_num } = current;
  const isSpanishLanguage = useSelector((state: any) => state.cities.isSpanishLanguage);
  const formatDate = (date: moment.Moment) => {
    const day = date.format('dddd');
    const dayOfMonth = date.format('D');
    const month = date.format('MMMM');
    const translatedDay = isSpanishLanguage ? dayTranslations[day] || day : day;
    const translatedMonth = isSpanishLanguage ? monthTranslations[month] || month : month;
    return isSpanishLanguage
      ? `${translatedDay}, ${dayOfMonth} de ${translatedMonth}`
      : `${day}, ${month} ${dayOfMonth}`;
  };
  const currentDate = formatDate(moment());
  const iconUrl = `/weather_icons/set01/big/${icon_num}.png`;
  const currentHour = moment().format("HH:mm");
  const translatedSummary = isSpanishLanguage ? translationMap[summary] || summary : summary;
  
  return (
    <Box
      className="content"
      sx={{
        maxWidth: 275,
        maxHeight: 400,
        borderRadius: 8,
        border: "2px solid #ccc",
        padding: 2,
        background: "linear-gradient(to right,  #257ad7, #dae4e9)",
        alignItems: 'center',
        marginTop: '30px',
        marginBottom: '20px',
        '&:hover': {
          backgroundColor: '#f0f0f0',
          cursor: 'pointer',
          transform: 'scale(1.01, 1.01 )',
        }
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        <CalendarMonthIcon style={{ marginRight: '8px', marginBottom: '-5px' }} />
        {currentDate} | {currentHour}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h2" sx={{ flexGrow: 1 }}>
          {temperature.toFixed(0)}Â°
        </Typography>
        <img src={iconUrl} alt="Weather Icon" style={{ width: '70px', height: '70px' }} />
      </Box>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {translatedSummary}
      </Typography>
      <Box>
        <AirIcon style={{ marginRight: '8px', marginBottom: '-5px' }} />
        {" " + wind.speed} m/s
        {` ${isSpanishLanguage ? wind.dir.replace(/W/g, 'O') : wind.dir}`}
        {" (" + wind.angle + "Â°)"}
      </Box>
    </Box>
  );
}
export default Current;
