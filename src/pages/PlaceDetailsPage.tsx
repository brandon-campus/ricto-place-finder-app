
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Star, Users, Volume2, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Place } from '../types';
import { getPlaceById, getFavorites, toggleFavorite } from '../services/placeService';

const PlaceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const placeData = getPlaceById(id);
      if (placeData) {
        setPlace(placeData);
        
        // Check if this place is in favorites
        const favorites = getFavorites();
        setIsFavorite(favorites.includes(id));
      }
      setLoading(false);
    }
  }, [id]);
  
  const handleToggleFavorite = () => {
    if (place) {
      const newStatus = toggleFavorite(place.id);
      setIsFavorite(newStatus);
      
      toast({
        title: newStatus ? 'Añadido a favoritos' : 'Eliminado de favoritos',
        description: newStatus ? `${place.name} ha sido añadido a tus favoritos` : `${place.name} ha sido eliminado de tus favoritos`,
        duration: 3000,
      });
    }
  };
  
  const renderPriceLevel = (level: number) => {
    const dollars = [];
    for (let i = 0; i < level; i++) {
      dollars.push(<DollarSign key={i} className="h-4 w-4" />);
    }
    return dollars;
  };
  
  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
    );
  }
  
  if (!place) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-bold mb-4">Lugar no encontrado</h1>
        <p className="mb-4">Lo sentimos, no pudimos encontrar el lugar que buscas.</p>
        <Link to="/places" className="text-primary hover:underline">
          Volver a explorar lugares
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 md:py-12 md:px-6">
      <div className="mb-6">
        <Link to="/places" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a explorar
        </Link>
      </div>
      
      <div className="md:flex gap-8">
        {/* Left Side - Image */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <div className="rounded-xl overflow-hidden">
            <img 
              src={place.image} 
              alt={place.name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        {/* Right Side - Details */}
        <div className="md:w-1/2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggleFavorite}
              className={isFavorite ? 'text-red-500' : ''}
            >
              <Heart className={isFavorite ? 'h-5 w-5 fill-red-500' : 'h-5 w-5'} />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 text-sm flex items-center">
              <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
              {place.rating}
            </div>
            <span className="text-sm text-muted-foreground">
              ({place.reviews} reseñas)
            </span>
          </div>
          
          <p className="text-muted-foreground mb-6">{place.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm font-medium">Ubicación</p>
                <p className="text-sm text-muted-foreground">{place.location.address}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm font-medium">Distancia</p>
                <p className="text-sm text-muted-foreground">{place.location.distance} km</p>
              </div>
            </div>
            <div className="flex items-center">
              <Volume2 className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm font-medium">Nivel de ruido</p>
                <p className="text-sm text-muted-foreground capitalize">{place.noiseLevel}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-5 w-5 flex justify-center text-muted-foreground mr-2">
                <div className="flex">
                  {renderPriceLevel(place.priceLevel)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Precio</p>
                <p className="text-sm text-muted-foreground">
                  {place.priceLevel === 1 ? 'Económico' : 
                   place.priceLevel === 2 ? 'Moderado' : 'Exclusivo'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Etiquetas</h2>
            <div className="flex flex-wrap gap-2">
              {place.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          
          {place.foodType && place.foodType.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Tipo de comida</h2>
              <div className="flex flex-wrap gap-2">
                {place.foodType.map((food, index) => (
                  <span key={index} className="tag bg-blue-100 text-blue-800">{food}</span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Ideal para</h2>
            <div className="flex flex-wrap gap-2">
              {place.mood.map((mood, index) => (
                <div key={index} className="flex items-center bg-secondary/10 text-secondary-foreground rounded-full px-3 py-1">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm capitalize">{mood}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Button className="w-full" size="lg">
            Cómo llegar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
