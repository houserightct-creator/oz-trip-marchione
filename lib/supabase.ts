import { TripData } from './types';

const STORAGE_KEY = 'oz_trip_data';

export const tripDataService = {
  async fetchTrip(passkey: string): Promise<TripData | null> {
    try {
      if (typeof window === 'undefined') return null;
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as TripData;
        return data;
      }
      return null;
    } catch (err) {
      console.error('Fetch error:', err);
      return null;
    }
  },

  async createTrip(passkey: string, tripData: TripData): Promise<TripData | null> {
    try {
      if (typeof window === 'undefined') return null;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tripData));
      return tripData;
    } catch (err) {
      console.error('Create error:', err);
      return null;
    }
  },

  async updateTrip(passkey: string, tripData: TripData): Promise<TripData | null> {
    try {
      if (typeof window === 'undefined') return null;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tripData));
      return tripData;
    } catch (err) {
      console.error('Update error:', err);
      return null;
    }
  },
};
