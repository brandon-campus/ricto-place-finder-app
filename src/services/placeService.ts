
import { Place, FilterOptions } from '../types';
import { placesData } from '../data/placesData';

// Simulamos almacenamiento local de favoritos
const FAVORITES_KEY = 'ricto_favorites';

export const getPlaces = (): Place[] => {
  return placesData;
};

export const getPlaceById = (id: string): Place | undefined => {
  return placesData.find(place => place.id === id);
};

export const getFavorites = (): string[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const toggleFavorite = (placeId: string): boolean => {
  const favorites = getFavorites();
  const isCurrentlyFavorite = favorites.includes(placeId);
  
  let newFavorites;
  if (isCurrentlyFavorite) {
    newFavorites = favorites.filter(id => id !== placeId);
  } else {
    newFavorites = [...favorites, placeId];
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  return !isCurrentlyFavorite;
};

export const getFavoritePlaces = (): Place[] => {
  const favorites = getFavorites();
  return placesData.filter(place => favorites.includes(place.id));
};

export const filterPlaces = (options: FilterOptions): Place[] => {
  return placesData.filter(place => {
    // Filtrar por nivel de ruido
    if (options.noiseLevel.length > 0 && !options.noiseLevel.includes(place.noiseLevel)) {
      return false;
    }
    
    // Filtrar por nivel de precio
    if (options.priceLevel.length > 0 && !options.priceLevel.includes(place.priceLevel)) {
      return false;
    }
    
    // Filtrar por distancia máxima
    if (place.location.distance > options.maxDistance) {
      return false;
    }
    
    // Filtrar por tipo de comida
    if (options.foodType.length > 0 && 
        place.foodType && 
        !place.foodType.some(food => options.foodType.includes(food))) {
      return false;
    }
    
    // Filtrar por estado de ánimo
    if (options.mood.length > 0 && 
        !place.mood.some(mood => options.mood.includes(mood))) {
      return false;
    }
    
    return true;
  });
};
