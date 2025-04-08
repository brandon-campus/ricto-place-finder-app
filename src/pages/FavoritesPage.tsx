
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import PlaceCard from '../components/PlaceCard';
import { Place } from '../types';
import { getFavoritePlaces, getFavorites, toggleFavorite } from '../services/placeService';

const FavoritesPage = () => {
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    // Load favorite places
    const places = getFavoritePlaces();
    setFavoritePlaces(places);
    
    // Load favorites ids
    const favIds = getFavorites();
    setFavorites(favIds);
  }, []);
  
  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    if (!isFavorite) {
      // Remove from UI immediately
      setFavoritePlaces(prev => prev.filter(place => place.id !== id));
    }
    
    // Update favorites state
    if (isFavorite) {
      setFavorites(prev => [...prev, id]);
    } else {
      setFavorites(prev => prev.filter(fav => fav !== id));
    }
  };

  return (
    <div className="container py-8 px-4 md:py-12 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Mis favoritos</h1>
        <p className="text-muted-foreground">
          Lugares que has guardado para visitar después
        </p>
      </div>
      
      {favoritePlaces.length === 0 ? (
        <div className="text-center py-16 bg-muted rounded-lg">
          <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center bg-background rounded-full">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No tienes favoritos todavía</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Marca lugares como favoritos para acceder rápidamente a ellos en cualquier momento
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favoritePlaces.map((place) => (
            <PlaceCard 
              key={place.id} 
              place={place} 
              isFavorite={favorites.includes(place.id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
