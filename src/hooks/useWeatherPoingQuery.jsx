import { useGetWeatherPointQuery } from '../slices/weatherApiSlice';
import { useEffect } from 'react';

const useWeatherPointSearch = ({ lat, lon }) => {
  const { data, isLoading, error } = useGetWeatherPointQuery({ lat, lon });
  return {
    weatherData: data,
    isLoading,
    error
  };
};
export default useWeatherPointSearch;
