import { apiSlice } from './apiSlice';
const LOCAL_BACKEND_URL = 'https://xxxxxxxxx./api/weather';

export const weatherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findPlaces: builder.query({
      query: (text) => `${LOCAL_BACKEND_URL}/places?text=${text}`, // Usamos la URL local y omitimos la clave API ya que se maneja internamente en el backend
    }),
    getWeatherPoint: builder.query({
      query: ({ lat, lon }) => `${LOCAL_BACKEND_URL}/point?lat=${lat}&lon=${lon}`,
    }),
    getWeatherDaily: builder.query({
      query: ({ place_id }) => `${LOCAL_BACKEND_URL}/daily?place_id=${place_id}`,
    }),
    getTimezoneInfo: builder.query({
      query: ({ ipParam }) => `${LOCAL_BACKEND_URL}/origin?ip=${ipParam.ip}`, // Llama a tu backend
    }),
    sendContactEmail: builder.mutation({
      query: ({ subject, text }) => ({
        url: `${LOCAL_BACKEND_URL}/contact/`,
        method: 'POST',
        body: JSON.stringify({
          to: 'temperaturein@temperaturein.com',
          subject,
          text,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getIp: builder.query({
      query: () => 'https://xxxxxxxxx.org?format=json',
    }),
    getCities: builder.mutation({
      query: (country) => ({
        url: `${LOCAL_BACKEND_URL}/cities?country=${country}`,
        method: 'POST',
        body: { country }, // Enviar el paÃ­s en el cuerpo de la solicitud
      }),
    }),
  }),
});
export const {
  useFindPlacesQuery,
  useGetWeatherPointQuery,
  useGetWeatherDailyQuery,
  useGetTimezoneInfoQuery,
  useSendContactEmailMutation,
  useGetIpQuery,
  useGetCitiesMutation,
} = weatherApiSlice;
