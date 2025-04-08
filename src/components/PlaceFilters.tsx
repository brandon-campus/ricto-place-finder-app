
import React, { useState } from 'react';
import { FilterOptions } from '../types';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PlaceFiltersProps {
  filters: FilterOptions;
  applyFilters: (filters: FilterOptions) => void;
  resetFilters: () => void;
}

const PlaceFilters: React.FC<PlaceFiltersProps> = ({ filters, applyFilters, resetFilters }) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  
  const handleNoiseLevelChange = (value: string) => {
    setLocalFilters(prev => {
      const updatedNoiseLevel = prev.noiseLevel.includes(value)
        ? prev.noiseLevel.filter(level => level !== value)
        : [...prev.noiseLevel, value];
      
      return {
        ...prev,
        noiseLevel: updatedNoiseLevel
      };
    });
  };
  
  const handlePriceLevelChange = (value: number) => {
    setLocalFilters(prev => {
      const updatedPriceLevel = prev.priceLevel.includes(value)
        ? prev.priceLevel.filter(level => level !== value)
        : [...prev.priceLevel, value];
      
      return {
        ...prev,
        priceLevel: updatedPriceLevel
      };
    });
  };
  
  const handleDistanceChange = (value: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      maxDistance: value[0]
    }));
  };
  
  const handleFoodTypeChange = (value: string) => {
    setLocalFilters(prev => {
      const updatedFoodType = prev.foodType.includes(value)
        ? prev.foodType.filter(type => type !== value)
        : [...prev.foodType, value];
      
      return {
        ...prev,
        foodType: updatedFoodType
      };
    });
  };
  
  const handleMoodChange = (value: string) => {
    setLocalFilters(prev => {
      const updatedMood = prev.mood.includes(value)
        ? prev.mood.filter(m => m !== value)
        : [...prev.mood, value];
      
      return {
        ...prev,
        mood: updatedMood
      };
    });
  };
  
  const handleApplyFilters = () => {
    applyFilters(localFilters);
  };
  
  const handleResetFilters = () => {
    const resetFilterValues = {
      noiseLevel: [],
      priceLevel: [],
      maxDistance: 10,
      foodType: [],
      mood: []
    };
    setLocalFilters(resetFilterValues);
    resetFilters();
  };

  return (
    <div className="bg-card rounded-lg p-4 border">
      <h2 className="font-semibold text-lg mb-4">Filtros</h2>
      
      <div className="space-y-6">
        {/* Noise Level Section */}
        <div>
          <h3 className="font-medium mb-2">Nivel de ruido</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="noise-low" 
                checked={localFilters.noiseLevel.includes('bajo')}
                onCheckedChange={() => handleNoiseLevelChange('bajo')}
              />
              <Label htmlFor="noise-low">Bajo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="noise-medium" 
                checked={localFilters.noiseLevel.includes('medio')}
                onCheckedChange={() => handleNoiseLevelChange('medio')}
              />
              <Label htmlFor="noise-medium">Medio</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="noise-high" 
                checked={localFilters.noiseLevel.includes('alto')}
                onCheckedChange={() => handleNoiseLevelChange('alto')}
              />
              <Label htmlFor="noise-high">Alto</Label>
            </div>
          </div>
        </div>
        
        {/* Price Level Section */}
        <div>
          <h3 className="font-medium mb-2">Nivel de precio</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="price-1" 
                checked={localFilters.priceLevel.includes(1)}
                onCheckedChange={() => handlePriceLevelChange(1)}
              />
              <Label htmlFor="price-1">$ (Económico)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="price-2" 
                checked={localFilters.priceLevel.includes(2)}
                onCheckedChange={() => handlePriceLevelChange(2)}
              />
              <Label htmlFor="price-2">$$ (Moderado)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="price-3" 
                checked={localFilters.priceLevel.includes(3)}
                onCheckedChange={() => handlePriceLevelChange(3)}
              />
              <Label htmlFor="price-3">$$$ (Exclusivo)</Label>
            </div>
          </div>
        </div>
        
        {/* Distance Section */}
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Distancia máxima</h3>
            <span className="text-sm text-muted-foreground">{localFilters.maxDistance} km</span>
          </div>
          <Slider
            defaultValue={[localFilters.maxDistance]}
            max={10}
            min={1}
            step={0.5}
            onValueChange={handleDistanceChange}
          />
        </div>
        
        {/* Food Type Section */}
        <div>
          <h3 className="font-medium mb-2">Tipo de comida</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="food-cafe" 
                checked={localFilters.foodType.includes('café')}
                onCheckedChange={() => handleFoodTypeChange('café')}
              />
              <Label htmlFor="food-cafe">Café</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="food-mediterranean" 
                checked={localFilters.foodType.includes('mediterránea')}
                onCheckedChange={() => handleFoodTypeChange('mediterránea')}
              />
              <Label htmlFor="food-mediterranean">Mediterránea</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="food-american" 
                checked={localFilters.foodType.includes('americana')}
                onCheckedChange={() => handleFoodTypeChange('americana')}
              />
              <Label htmlFor="food-american">Americana</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="food-tapas" 
                checked={localFilters.foodType.includes('tapas')}
                onCheckedChange={() => handleFoodTypeChange('tapas')}
              />
              <Label htmlFor="food-tapas">Tapas</Label>
            </div>
          </div>
        </div>
        
        {/* Mood Section */}
        <div>
          <h3 className="font-medium mb-2">Estado de ánimo</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mood-work" 
                checked={localFilters.mood.includes('trabajo')}
                onCheckedChange={() => handleMoodChange('trabajo')}
              />
              <Label htmlFor="mood-work">Trabajo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mood-date" 
                checked={localFilters.mood.includes('citas')}
                onCheckedChange={() => handleMoodChange('citas')}
              />
              <Label htmlFor="mood-date">Citas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mood-family" 
                checked={localFilters.mood.includes('familia')}
                onCheckedChange={() => handleMoodChange('familia')}
              />
              <Label htmlFor="mood-family">Familia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mood-coffee" 
                checked={localFilters.mood.includes('café')}
                onCheckedChange={() => handleMoodChange('café')}
              />
              <Label htmlFor="mood-coffee">Café</Label>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            className="w-full"
            onClick={handleApplyFilters}
          >
            Aplicar filtros
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleResetFilters}
          >
            Reiniciar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceFilters;
