import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import AirIcon from '@mui/icons-material/Air';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const Hourly = ({ hourly }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = hourly.data.length;
  const visibleItems = 1; // Show 1 card at a time
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragEndX, setDragEndX] = useState<number | null>(null);
  const isSpanishLanguage = useSelector((state: any) => state.cities.isSpanishLanguage);
  
  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };
  
  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, totalItems - visibleItems));
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
        setCurrentIndex(prevIndex => Math.min(prevIndex + 3, totalItems - visibleItems));
      } else if (difference < -50) {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 3, 0));
      }
    }
    setDragStartX(null);
    setDragEndX(null);
  };

  return (
    <Box display="flex" alignItems="center" className="box-carousel-hourly">
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
        sx={{ cursor: 'grab' }}
      >
        <Box
          display="flex"
          sx={{
            transform: `translateX(-${(currentIndex / totalItems) * 100}%)`,
            transition: 'transform 0.5s ease',
            width: `${100 * totalItems / visibleItems}%`
          }}
        >
          {hourly.data.map((hour, index) => {
            const iconUrl = `/weather_icons/set01/medium/${hour.icon}.png`; // Construct the icon URL
            return (
              <Card key={index} sx={{ flex: '0 0 100px', margin: '0 5px', height: '200px', width: '100px' }}>
                <CardContent sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px', gap: '8px', minHeight: '150px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer',
                    transform: 'scale(1.02, 1.02)',
                    transition: 'background-color 0.7s, transform 0.7s'
                  }
                }}>
                  <Typography variant="body2">{moment(hour.date).format("HH:mm")}</Typography>
                  <img src={iconUrl} alt="Weather Icon" style={{ width: '50px', height: '50px' }} /> { }
                  <Typography variant="h6" fontWeight="bold">{hour.temperature.toFixed(0)}Â°C</Typography>
                  <Divider sx={{ marginTop: '10px', borderTop: '1px solid black', margin: '0px auto', width: '70%' }} />
                  <AirIcon style={{ marginRight: '8px', marginBottom: '-5px' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    { }
                    {hour.wind.speed} m/s {` ${isSpanishLanguage ? hour.wind.dir.replace(/W/g, 'O') : hour.wind.dir} `}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
      <IconButton onClick={handleNext} disabled={currentIndex === totalItems - visibleItems}>
        <ArrowForwardIosIcon sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};
export default Hourly;
