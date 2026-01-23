import axios from 'axios';
import { websiteApiUrl, BACKEND_TIMEOUT } from '../util/consts';

export const defaultRequestHeaders = {};

// Backend für Website API (Vehicle-Verwaltung)
export const Backend = axios.create({
  baseURL: websiteApiUrl,
  timeout: BACKEND_TIMEOUT,
  headers: { ...defaultRequestHeaders, 'Content-Type': 'application/json' },
});
