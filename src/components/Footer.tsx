
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">Ricto</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Encuentra el lugar perfecto para cada momento.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end md:justify-end">
          <nav className="flex gap-4 md:gap-6">
            <Link to="/about" className="text-xs md:text-sm text-muted-foreground underline-offset-4 hover:underline">
              Acerca de
            </Link>
            <Link to="/contact" className="text-xs md:text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contacto
            </Link>
            <Link to="/privacy" className="text-xs md:text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacidad
            </Link>
            <Link to="/terms" className="text-xs md:text-sm text-muted-foreground underline-offset-4 hover:underline">
              Términos
            </Link>
          </nav>
          <p className="text-center text-xs text-muted-foreground md:text-right">
            &copy; {new Date().getFullYear()} Ricto. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
