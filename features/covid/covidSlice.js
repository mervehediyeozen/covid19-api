import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk('covid/fetchCountries', async () => {
  const res = await axios.get('https://disease.sh/v3/covid-19/countries');
  return res.data.map(c => c.country);
});

export const fetchCountryData = createAsyncThunk('covid/fetchCountryData', async (country) => {
  const res = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
  return res.data;
});

const covidSlice = createSlice({
  name: 'covid',
  initialState: {
    countries: [],
    selectedCountry: 'Turkey',
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(fetchCountryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCountry } = covidSlice.actions;
export default covidSlice.reducer;
