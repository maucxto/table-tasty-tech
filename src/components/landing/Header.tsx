import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center group-hover:shadow-glow transition-shadow">
              <Utensils className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Click&EAT</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Características
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Precios
            </a>
            <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
              Demo
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth?mode=login">Iniciar Sesión</Link>
            </Button>
            <Button asChild variant="hero" size="sm">
              <Link to="/auth?mode=signup">Comenzar Gratis</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
