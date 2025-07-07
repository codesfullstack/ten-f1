import React from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';
import moment from 'moment';

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

const texts = {
  en: {
    title: 'Daily Temperature Range',
    hAxisTitle: 'Day',
    vAxisTitle: 'Temperature (Â°)',
  },
  es: {
    title: 'Rango de Temperatura Diaria',
    hAxisTitle: 'DÃ­a',
    vAxisTitle: 'Temperatura (Â°)',
  }
};

const dayTranslations = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'MiÃ©rcoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'SÃ¡bado',
  Sunday: 'Domingo',
};

const getDayInCurrentLanguage = (day: string, isSpanish: boolean) => {
  const dayInEnglish = moment(day).format('dddd'); // Obtener el dÃ­a de la semana en inglÃ©s
  return isSpanish ? dayTranslations[dayInEnglish] || dayInEnglish : dayInEnglish; // Traducir si es espaÃ±ol
};

const DailyTemperatureChart: React.FC<DailyProps> = ({ daily }) => {
  const isSpanishLanguage = useSelector((state) => state.cities.isSpanishLanguage);
  const locale = isSpanishLanguage ? 'es' : 'en';
  const t = texts[locale];
  const data = [
    [t.hAxisTitle, 'Min Â°', 'Max Â°'],
    ...(daily?.data.map((entry) => {
      const dayInCurrentLanguage = getDayInCurrentLanguage(entry.day, isSpanishLanguage);
      return [
        dayInCurrentLanguage,
        Math.round(entry.all_day?.temperature_min || 0), // Temperatura mÃ­nima
        Math.round(entry.all_day?.temperature_max || 0)  // Temperatura mÃ¡xima
      ];
    }) || [])
  ];
  const options = {
    title: t.title,
    hAxis: {
      title: t.hAxisTitle,
    },
    vAxis: {
      title: t.vAxisTitle,
      format: '#Âº'
    },
    legend: { position: 'top' },
    series: {
      0: { color: '#1E90FF' }, // Color para la temperatura mÃ­nima
      1: { color: '#FF4500' }, // Color para la temperatura mÃ¡xima
    },
    pointSize: 5,
  };
  
  return (
    <div style={{ display: 'flex', marginTop: '10px', marginLeft: '45px', marginRight: '40px' }}>
      <Chart
        chartType="LineChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
};
export default DailyTemperatureChart;
