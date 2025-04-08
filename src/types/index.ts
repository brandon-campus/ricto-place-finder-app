
export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  priceLevel: 1 | 2 | 3; // 1: $, 2: $$, 3: $$$
  noiseLevel: 'bajo' | 'medio' | 'alto';
  location: {
    address: string;
    distance: number; // in kilometers
  };
  foodType?: string[];
  mood: ('trabajo' | 'citas' | 'familia' | 'café')[];
  rating: number;
  reviews: number;
  isFavorite?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface FilterOptions {
  noiseLevel: string[];
  priceLevel: number[];
  maxDistance: number;
  foodType: string[];
  mood: string[];
}
