
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Place } from '../types';
import { toggleFavorite } from '../services/placeService';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface PlaceCardProps {
  place: Place;
  isFavorite: boolean;
  onFavoriteToggle: (id: string, isFavorite: boolean) => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, isFavorite, onFavoriteToggle }) => {
  const { id, name, description, image, tags, priceLevel, rating } = place;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = toggleFavorite(id);
    onFavoriteToggle(id, newStatus);
    
    toast({
      title: newStatus ? 'Añadido a favoritos' : 'Eliminado de favoritos',
      description: newStatus ? `${name} ha sido añadido a tus favoritos` : `${name} ha sido eliminado de tus favoritos`,
      duration: 3000,
    });
  };

  const renderPriceLevel = () => {
    switch (priceLevel) {
      case 1:
        return <span className="price-tag price-1">$</span>;
      case 2:
        return <span className="price-tag price-2">$$</span>;
      case 3:
        return <span className="price-tag price-3">$$$</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/places/${id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
            />
          </button>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-xl line-clamp-1">{name}</h3>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
            {renderPriceLevel()}
          </div>
          <Button variant="outline" className="w-full" asChild>
            <span>Ver detalles</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCard;
