import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-restaurant.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern restaurant interior" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">SaaS Multi-Restaurante</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-slide-up">
            Transforma tu restaurante con
            <span className="bg-gradient-hero bg-clip-text text-transparent"> menús digitales</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Sistema completo de menú digital con códigos QR. Gestiona pedidos, pagos y tu equipo desde un solo lugar.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
            <Button asChild size="lg" variant="hero" className="group">
              <Link to="/auth">
                Comenzar Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outlineHero">
              <Link to="/demo">
                <QrCode className="w-5 h-5" />
                Ver Demo
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground animate-fade-in animation-delay-600">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background" />
                <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background" />
                <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-background" />
              </div>
              <span>+100 restaurantes activos</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <span className="hidden sm:inline">14 días de prueba gratis</span>
          </div>
        </div>
      </div>
    </section>
  );
};
