import { useFindPlacesQuery } from '../slices/weatherApiSlice';

const usePlaceSearch = (inputValue) => {
  const { data, isLoading, isFetching, error } = useFindPlacesQuery(inputValue);
  return {
    places: data || [],
    isLoading,
    isFetching
  };
};
export default usePlaceSearch;
