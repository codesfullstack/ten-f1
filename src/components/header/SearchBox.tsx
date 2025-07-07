import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from 'react-redux';
import { selectCity } from '../../actions/actions'; // Ajusta la ruta segÃºn la ubicaciÃ³n real de actions.js
import usePlaceSearch from '../../hooks/usePlaceSearch';
interface SearchBoxProps {
  onSearchBoxLoading: (loading: boolean) => void;
}
const SearchBox: React.FC<SearchBoxProps> = ({ onSearchBoxLoading }) => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state: any) => state.cities.selectedCity); // AsegÃºrate de acceder a cities.selectedCity
  const [inputValue, setInputValue] = useState('');
  const { places, isLoading, isFetching } = usePlaceSearch(inputValue);
  const isSpanishLanguage = useSelector((state: any) => state.cities.isSpanishLanguage);
  const handlePlaceSelected = (event, value) => {
    dispatch(selectCity(value)); // Despacha la acciÃ³n para seleccionar la ciudad
  };
  useEffect(() => {
    onSearchBoxLoading(isFetching);
  }, [isFetching, onSearchBoxLoading]);
  const label = isSpanishLanguage ? "Temperatura en .." : "Temperature in ..";
  return (
    <Autocomplete
      style={{ width: '204px', background: 'white', borderRadius: '4px' }}
      options={places}
      autoHighlight
      getOptionLabel={(option) => `${option.name}, ${option.adm_area1}, ${option.country}`}
      onChange={handlePlaceSelected}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      loading={isLoading}
      renderInput={(params) => (
        <React.Fragment>
          <TextField
            {...params}
            variant="outlined"
            label={label}
            InputLabelProps={{
              shrink: false,
              style: { display: inputValue ? 'none' : 'block' }
            }}
            style={{ fontSize: '12px', position: 'relative' }}
          />
          {isFetching && <CircularProgress size={20} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} />}
        </React.Fragment>
      )}
      renderOption={(props, _option, { index }) => {
        const place = places[index];
        return (
          <ListItem {...props} style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon style={{ marginRight: '3px' }}>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText
              primary={place.name}
              secondary={`${place.adm_area1}, ${place.country}`}
              style={{ fontSize: '5px' }}
            />
          </ListItem>
        );
      }}
      value={selectedCity} // Mostrar la ciudad seleccionada en Autocomplete
    />
  );
};
export default SearchBox;
