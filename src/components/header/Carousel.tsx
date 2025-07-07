import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { selectCity } from '../../actions/actions'; // AsegÃºrate de que la ruta sea correcta
interface CarouselProps {
  updateKey: number;
}
const Carousel: React.FC<CarouselProps> = ({ updateKey }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragEndX, setDragEndX] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Object.keys(localStorage):", Object.keys(localStorage));
    const now = Date.now();
    const localStorageItems = Object.keys(localStorage)
      .filter(key => key.startsWith("myApp-")) // Filtra solo las claves que comienzan con "myApp-"
      .map(key => {
        try {
          const value = localStorage.getItem(key);
          if (value) {
            const item = JSON.parse(value);
            if (now < item.expiry) {
              return item; // Agrega solo si no ha expirado
            } else {
              localStorage.removeItem(key); // Elimina si ha expirado
            }
          }
        } catch (error) {
          console.error("Error al procesar localStorage en carousel:", error);
        }
        return null; // Retorna null si algo sale mal
      })
      .filter(item => item !== null); // Filtra los elementos nulos
    if (localStorageItems.length >= 20) {
      const firstItemKey = Object.keys(localStorage).find(key => key.startsWith("myApp-"));
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith("myApp-") && key !== firstItemKey) {
          localStorage.removeItem(key);
        }
      });
    }
    setItems(localStorageItems); // Actualiza el estado con los elementos recuperados
  }, [updateKey]);
  const visibleItems = 1;
  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? items.length - visibleItems : prevIndex - 1));
  };
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === items.length - visibleItems ? 0 : prevIndex + 1));
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
        setCurrentIndex(prevIndex => (prevIndex + 2 >= items.length ? items.length - visibleItems : prevIndex + 2));
      } else if (difference < -50) {
        setCurrentIndex(prevIndex => (prevIndex - 2 < 0 ? 0 : prevIndex - 2));
      }
    }
    setDragStartX(null);
    setDragEndX(null);
  };
  const handleItemClick = (item: any) => {
    if (item.name) {
      console.log("click item:" + item.name);
      const mockCity = {
        "name": item.name,
        "adm_area1": item.adm_area1,
        "country": item.country,
        lon: item.lon,
        lat: item.lat,
        place_id: item.place_id,
      };
      dispatch(selectCity(mockCity));
      setCurrentIndex(0);
    } else {
      console.warn("Item name is undefined");
    }
  };
  const width = `${items.length === 1 ? (window.innerWidth <= 600 ? '100%' : '50%') : 100 * items.length}%`;
  useEffect(() => {
    const storedItems = Object.keys(localStorage)
      .filter(key => key.startsWith("myApp-")) // Filtrar solo las claves que comienzan con "myApp-"
      .map(key => {
        try {
          return JSON.parse(localStorage.getItem(key)); // Intentar parsear el item
        } catch (error) {
          console.error(`Error al parsear el item de localStorage con clave ${key}:`, error);
          return null; // Retorna null si ocurre un error
        }
      })
      .filter(item => item !== null); // Filtra los elementos nulos
    const sortedItems = storedItems.sort((a, b) => b.timestamp - a.timestamp);
    setItems(sortedItems); // Actualiza el estado con los elementos ordenados
  }, [updateKey]);
  return (
    <>
      {items.length >= 1 && (
        <Box
          display="flex"
          alignItems="center"
          className="box-carousel"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{ cursor: 'grab' }}
        >
          { }
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon sx={{ color: "white" }} />
          </IconButton>
          <Box display="flex" overflow="hidden" width="350px">
            <Box
              display="flex"
              sx={{
                transform: `translateX(-${currentIndex * (106 / items.length)}%)`,
                transition: 'transform 0.5s ease',
                width: width
              }}
            >
              {items.map((item, index) => {
                const iconUrl = `/weather_icons/set01/medium/${item.icon_num}.png`;
                return (
                  <Card
                    key={index}
                    sx={{
                      flex: `0 0 ${100 / items.length}%`, margin: '0 5px', height: '60px',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                        cursor: 'pointer',
                        transition: 'background-color 0.7s, transform 0.7s'
                      }
                    }}
                    onClick={() => handleItemClick(item)}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '8px', gap: '8px', minHeight: '55px', width: '137px' }}>
                      <Box sx={{ mb: 1 }}>
                        <img src={iconUrl} alt="Weather Icon" style={{ width: '30px', height: '30px', marginTop: '5px' }} />
                      </Box>
                      <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                          {item.adm_area1}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {item.temperature + 'Â°'}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Box>
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
      )}
    </>
  );
}
export default Carousel;
