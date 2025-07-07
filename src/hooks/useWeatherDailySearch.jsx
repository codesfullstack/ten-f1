import { useGetWeatherDailyQuery } from '../slices/weatherApiSlice';

const useWeatherDailySearch = ({ place_id }) => {
  const { data, isLoading, error } = useGetWeatherDailyQuery({ place_id });
  const weatherDailyData = data?.daily || null;
  return {
    weatherDailyData,  // Renombramos weatherDailyData a dailyData para simplificar
    isLoading,
    error
  };
};
export default useWeatherDailySearch;
