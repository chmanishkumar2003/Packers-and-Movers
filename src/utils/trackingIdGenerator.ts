import { v4 as uuidv4 } from 'uuid';

export const generateTrackingId = (): string => {
  const timestamp = Date.now().toString(36);
  const uuid = uuidv4().substring(0, 8).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  return `PM${timestamp}${uuid}${random}`;
};

export const generateBookingId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `BK${timestamp}${random}`;
};

export const generateUserId = (): string => {
  return uuidv4();
};