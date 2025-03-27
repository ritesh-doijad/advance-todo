import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch weather data
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
  return data;
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch weather";
      });
  },
});

export default weatherSlice.reducer;
