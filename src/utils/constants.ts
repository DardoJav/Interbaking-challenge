import { config } from '../config/env.js';

export const PORT = config.PORT;
export const MONGO_URI = config.MONGO_URI;
export const JWT_SECRET = config.JWT_SECRET;
export const JWT_EXPIRES_IN = config.JWT_EXPIRES_IN;

// Regex patterns
export const CUIT_REGEX = /^[0-9]{2}-[0-9]{8}-[0-9]{1}$/;
export const RAZON_SOCIAL_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]{3,100}$/;