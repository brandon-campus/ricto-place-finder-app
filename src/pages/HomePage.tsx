
import React from 'react';
import { MessageCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container py-12 px-4 md:py-24 md:px-6">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Encuentra el <span className="text-primary">lugar perfecto</span> para cada momento
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Ricto te ayuda a descubrir sitios adaptados a lo que buscas, ya sea trabajo, ocio, una cita o un momento en familia.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/chat" className="main-button">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <MessageCircle className="h-12 w-12 text-primary animate-bounce-slow" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Habla con Jamito</h2>
            <p className="text-muted-foreground">
              Nuestro asistente virtual te ayudará a encontrar el lugar ideal según tus necesidades.
            </p>
          </Link>
          
          <Link to="/places" className="main-button">
            <div className="h-24 w-24 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
              <MapPin className="h-12 w-12 text-secondary animate-bounce-slow" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Explorar lugares</h2>
            <p className="text-muted-foreground">
              Descubre nuestra selección de sitios y encuentra el que mejor se adapta a ti.
            </p>
          </Link>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona Ricto?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-accent rounded-xl p-6 text-center">
            <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Dinos qué necesitas</h3>
            <p className="text-muted-foreground">
              Explícanos tu situación, si buscas un lugar para trabajar, una cena romántica o un sitio familiar.
            </p>
          </div>
          <div className="bg-accent rounded-xl p-6 text-center">
            <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Explora opciones</h3>
            <p className="text-muted-foreground">
              Recibe recomendaciones personalizadas y explora detalles, fotos y valoraciones de cada lugar.
            </p>
          </div>
          <div className="bg-accent rounded-xl p-6 text-center">
            <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Disfruta la experiencia</h3>
            <p className="text-muted-foreground">
              Visita el lugar elegido y guárdalo en favoritos si te gusta para futuras ocasiones.
            </p>
          </div>
        </div>
      </section>
      
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">¿Listo para encontrar tu próximo lugar favorito?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Empieza a explorar ahora y descubre sitios increíbles adaptados a cada momento de tu vida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/places" className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors">
            Explorar lugares
          </Link>
          <Link to="/chat" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 px-6 rounded-lg font-medium transition-colors">
            Hablar con Jamito
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
