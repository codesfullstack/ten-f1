import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Divider, Stack, Switch } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBox from './header/SearchBox';
import Carousel from './header/Carousel';
import { selectCity, setLanguage } from '../actions/actions';
import Drawer from './header/Drawer';

interface HeaderProps {
  updateKey: number;
  onSearchBoxLoaded: (loading: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ updateKey, onSearchBoxLoaded }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSpanishLanguage = useSelector((state: any) => state.cities.isSpanishLanguage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') {
      return;
    }
    setDrawerOpen(open);
  };

  const handleClick = () => {
    try {
      console.log("Object.keys(localStorage):", Object.keys(localStorage));
      const now = Date.now();
      const localStorageItems = Object.keys(localStorage)
        .filter(key => key !== '_grecaptcha')
        .map(key => {
          const value = localStorage.getItem(key);
          if (value) {
            try {
              const item = JSON.parse(value);
              if (now < item.expiry) {
                return item;
              } else {
                localStorage.removeItem(key);
              }
            } catch (error) {
              console.error(`Error al parsear item con clave ${key}:`, error);
            }
          }
          return null;
        })
        .filter(item => item !== null);

      const defaultCity = JSON.parse(localStorage.getItem('defaultCity'));
      if (defaultCity && defaultCity.name) {
        const mockCity = {
          name: defaultCity.name,
          adm_area1: defaultCity.adm_area1,
          country: defaultCity.country,
          lon: defaultCity.lon,
          lat: defaultCity.lat,
          place_id: defaultCity.place_id
        };
        dispatch(selectCity(mockCity));
        const path = `/temperature-in-${defaultCity.name.toLowerCase().replace(/\s+/g, '-')}`;
        navigate(path, { replace: true });
        return;
      }

      if (localStorageItems.length > 1) {
        const firstItem = localStorageItems[1];
        if (firstItem && firstItem.name) {
          const mockCity = {
            name: firstItem.name,
            adm_area1: firstItem.adm_area1,
            country: firstItem.country,
            lon: firstItem.lon,
            lat: firstItem.lat,
            place_id: firstItem.place_id
          };
          dispatch(selectCity(mockCity));
          const path = `/temperature-in-${firstItem.name.toLowerCase().replace(/\s+/g, '-')}`;
          navigate(path, { replace: true });
        } else {
          console.warn("El primer elemento no tiene un nombre válido.");
        }
      } else {
        console.warn("No se encontraron suficientes elementos en localStorage.");
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error en handleClick:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <header>
          <div className="header" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="caja caja1" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <Typography variant="h6">T° </Typography>
            </div>

            <div className="col-auto border-right"></div>
            <div className="caja caja2">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </div>
            <div style={{ height: '60px' }} className='divider-hidden'>
              <Divider orientation="vertical" style={{ backgroundColor: 'white', width: '0.2px' }} />
            </div>
            <div className="caja caja3">
              <SearchBox onSearchBoxLoading={onSearchBoxLoaded} />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: -17 }}>
                <div style={{ transformOrigin: 'center', marginBottom: -2 }}>
                  <Typography sx={{ fontSize: '10px' }}>
                    EN
                  </Typography>
                </div>

                <Switch
                  checked={isSpanishLanguage}
                  onChange={() => dispatch(setLanguage(!isSpanishLanguage))}
                  inputProps={{ 'aria-label': 'language toggle' }}
                  sx={{
                    height: 35,
                    '& .MuiSwitch-thumb': {
                      width: 10,
                      height: 10,
                      backgroundColor: 'white',
                      marginTop: 0.4,
                      marginLeft: 0.65
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: 'blue',
                    },
                    '&.Mui-checked .MuiSwitch-thumb': {
                      backgroundColor: 'yellow',
                    },
                    transform: 'rotate(90deg)',
                    transformOrigin: 'center',
                  }}
                />

                <div style={{ transformOrigin: 'center', marginTop: -2 }}>
                  <Typography sx={{ fontSize: '10px' }}>
                    ES
                  </Typography>
                </div>
              </div>
            </div>
            <div className="caja caja4">
              <Carousel updateKey={updateKey} />
            </div>
          </div>
        </header>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} />
    </Box>
  );
};

export default Header;