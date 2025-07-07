import React from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';

const texts = {
  en: {
    title: 'Hourly Temperature',
    hAxisTitle: 'Hour',
    vAxisTitle: 'Temperature (Â°)',
  },
  es: {
    title: 'Temperatura por Hora',
    hAxisTitle: 'Hora',
    vAxisTitle: 'Temperatura (Â°)',
  }
};

const HourlyTemperatureChart = ({ hourly }) => {
  const isSpanishLanguage = useSelector((state) => state.cities.isSpanishLanguage);
  const locale = isSpanishLanguage ? 'es' : 'en';
  const t = texts[locale];
  const data = [
    [t.hAxisTitle, t.vAxisTitle],
    ...hourly.map((entry) => [
      new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      Math.round(entry.temperature) // Solo el nÃºmero
    ])
  ];

  const options = {
    title: t.title,
    hAxis: {
      title: t.hAxisTitle,
    },
    vAxis: {
      title: t.vAxisTitle,
      format: '#Âº' // Formato para mostrar el sÃ­mbolo de grado
    },
    legend: 'none',
    tooltip: {
      formatter: (data) => {
        const temp = `${data[0][1]}Âº`; // AÃ±adir el sÃ­mbolo de grado
        return `<div style="padding: 5px;">${data[0][0]}: ${temp}</div>`;
      }
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
export default HourlyTemperatureChart;
