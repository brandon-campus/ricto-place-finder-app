
import React, { useState, useEffect } from 'react';
import { Grid3X3, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlaceCard from '../components/PlaceCard';
import { Place, FilterOptions } from '../types';
import { getPlaces, getFavorites } from '../services/placeService';
import PlaceFilters from '../components/PlaceFilters';

const PlacesPage = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Initializing with default filters
  const [filters, setFilters] = useState<FilterOptions>({
    noiseLevel: [],
    priceLevel: [],
    maxDistance: 10,
    foodType: [],
    mood: []
  });
  
  useEffect(() => {
    // Load places
    const allPlaces = getPlaces();
    setPlaces(allPlaces);
    setFilteredPlaces(allPlaces);
    
    // Load favorites
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  }, []);
  
  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    if (isFavorite) {
      setFavorites(prev => [...prev, id]);
    } else {
      setFavorites(prev => prev.filter(fav => fav !== id));
    }
  };
  
  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    // Apply filters to places
    let result = [...places];
    
    // Filter by noise level
    if (newFilters.noiseLevel.length > 0) {
      result = result.filter(place => newFilters.noiseLevel.includes(place.noiseLevel));
    }
    
    // Filter by price level
    if (newFilters.priceLevel.length > 0) {
      result = result.filter(place => newFilters.priceLevel.includes(place.priceLevel));
    }
    
    // Filter by distance
    result = result.filter(place => place.location.distance <= newFilters.maxDistance);
    
    // Filter by food type
    if (newFilters.foodType.length > 0) {
      result = result.filter(place => 
        place.foodType && place.foodType.some(food => newFilters.foodType.includes(food))
      );
    }
    
    // Filter by mood
    if (newFilters.mood.length > 0) {
      result = result.filter(place => 
        place.mood.some(mood => newFilters.mood.includes(mood))
      );
    }
    
    setFilteredPlaces(result);
  };
  
  const resetFilters = () => {
    setFilters({
      noiseLevel: [],
      priceLevel: [],
      maxDistance: 10,
      foodType: [],
      mood: []
    });
    setFilteredPlaces(places);
  };
  
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container py-8 px-4 md:py-12 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Explorar lugares</h1>
          <p className="text-muted-foreground">
            Descubre sitios adaptados a tus necesidades
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="md:hidden flex-1"
            onClick={toggleFilterPanel}
          >
            <Menu className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          
          <div className="flex border rounded-md">
            <Button
              variant={isGridView ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsGridView(true)}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={!isGridView ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsGridView(false)}
              className="rounded-l-none"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Visible on desktop or when toggled on mobile */}
        <div className={`md:w-1/4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <PlaceFilters 
            filters={filters} 
            applyFilters={applyFilters} 
            resetFilters={resetFilters} 
          />
        </div>
        
        {/* Places Grid */}
        <div className="md:w-3/4">
          {filteredPlaces.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="text-xl font-medium mb-2">No hay lugares que coincidan con tus filtros</h3>
              <p className="text-muted-foreground mb-4">Prueba a ajustar tus criterios de búsqueda</p>
              <Button onClick={resetFilters}>Reiniciar filtros</Button>
            </div>
          ) : (
            <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredPlaces.map((place) => (
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
      </div>
    </div>
  );
};

export default PlacesPage;
