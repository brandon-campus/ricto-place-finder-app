
import { ChatMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Respuestas predefinidas para el chatbot
const predefinedResponses: Record<string, string[]> = {
  greeting: [
    "¡Hola! Soy Jamito, tu asistente para encontrar lugares. ¿En qué puedo ayudarte hoy?",
    "¡Bienvenido a Ricto! Me llamo Jamito y estoy aquí para ayudarte a encontrar el lugar perfecto.",
    "¡Hola! ¿Buscas un lugar especial hoy? Cuéntame qué necesitas."
  ],
  cafe: [
    "Tengo varios cafés geniales para recomendarte. ¿Prefieres algo tranquilo para trabajar o más social?",
    "¡Me encanta el café! ¿Buscas un lugar con buen WiFi o más enfocado en la experiencia del café?",
    "Hay excelentes cafeterías cerca. ¿Tienes alguna preferencia de ambiente o ubicación?"
  ],
  restaurant: [
    "¿Qué tipo de comida te apetece? Tengo recomendaciones para todos los gustos.",
    "¿Buscas un restaurante para una ocasión especial o algo más casual?",
    "Puedo recomendarte restaurantes increíbles. ¿Cuál es tu presupuesto aproximado?"
  ],
  work: [
    "Para trabajar recomiendo lugares con buen WiFi y ambiente tranquilo. ¿Necesitas también enchufes disponibles?",
    "Conozco varios espacios perfectos para trabajar. ¿Prefieres un café tranquilo o un coworking?",
    "Trabajar fuera de casa puede ser muy productivo. ¿Qué es más importante para ti: silencio, comodidad o buenas bebidas?"
  ],
  date: [
    "Para una cita tengo lugares románticos con ambientes acogedores. ¿Es una primera cita o una celebración especial?",
    "¿Buscas algo romántico? Tengo excelentes recomendaciones para impresionar a tu cita.",
    "Para citas recomiendo lugares con buena iluminación y no demasiado ruidosos. ¿Prefieres algo casual o elegante?"
  ],
  family: [
    "Para salidas familiares hay opciones con espacios para niños. ¿Cuántas personas son y qué edades tienen los niños?",
    "Las salidas familiares son especiales. ¿Buscas un lugar con actividades para niños o más enfocado en la comida?",
    "Tengo excelentes recomendaciones familiares. ¿Prefieres interior o terraza?"
  ],
  fallback: [
    "No estoy seguro de entender lo que buscas. ¿Podrías darme más detalles sobre el tipo de lugar que necesitas?",
    "Mmm, déjame pensar un poco más sobre eso. ¿Podrías reformular tu pregunta o darme más información?",
    "Interesante búsqueda. Para ayudarte mejor, ¿podrías especificar qué tipo de lugar estás buscando?"
  ]
};

// Función para obtener una respuesta aleatoria de una categoría
const getRandomResponse = (category: string): string => {
  const responses = predefinedResponses[category] || predefinedResponses.fallback;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// Función para analizar el mensaje y devolver una categoría de respuesta
const analyzeMessage = (message: string): string => {
  message = message.toLowerCase();
  
  if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes') || message.includes('buenas noches') || message.length < 5) {
    return 'greeting';
  } else if (message.includes('café') || message.includes('cafetería') || message.includes('te') || message.includes('té')) {
    return 'cafe';
  } else if (message.includes('restaurante') || message.includes('comer') || message.includes('cenar') || message.includes('comida')) {
    return 'restaurant';
  } else if (message.includes('trabajo') || message.includes('trabajar') || message.includes('estudiar') || message.includes('wifi') || message.includes('enchufe')) {
    return 'work';
  } else if (message.includes('cita') || message.includes('romántico') || message.includes('pareja') || message.includes('aniversario')) {
    return 'date';
  } else if (message.includes('familia') || message.includes('niños') || message.includes('niñas') || message.includes('hijos')) {
    return 'family';
  } else {
    return 'fallback';
  }
};

export const getResponse = (userMessage: string): ChatMessage => {
  const category = analyzeMessage(userMessage);
  const botResponse = getRandomResponse(category);
  
  return {
    id: uuidv4(),
    sender: 'bot',
    text: botResponse,
    timestamp: new Date()
  };
};

export const createUserMessage = (text: string): ChatMessage => {
  return {
    id: uuidv4(),
    sender: 'user',
    text,
    timestamp: new Date()
  };
};
