import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "14 días de prueba",
    description: "Perfecto para probar el sistema",
    features: [
      "1 restaurante",
      "5 mesas",
      "20 productos",
      "Soporte por email",
      'Marca "Powered by Click&EAT"',
    ],
    cta: "Comenzar Gratis",
    popular: false,
  },
  {
    name: "Basic",
    price: "$29",
    period: "por mes",
    description: "Para restaurantes pequeños",
    features: [
      "1 restaurante",
      "20 mesas",
      "Productos ilimitados",
      "Subdomain personalizado",
      "Sin marca",
      "Soporte prioritario",
    ],
    cta: "Comenzar Ahora",
    popular: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "por mes",
    description: "Máxima potencia y flexibilidad",
    features: [
      "1 restaurante",
      "Mesas ilimitadas",
      "Productos ilimitados",
      "Dominio personalizado",
      "Analytics avanzado",
      "Integraciones de pago",
      "Soporte 24/7",
    ],
    cta: "Comenzar Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contactar ventas",
    description: "Para cadenas y franquicias",
    features: [
      "Múltiples restaurantes",
      "Todo ilimitado",
      "White label completo",
      "API access",
      "Dedicated support",
      "SLA garantizado",
    ],
    cta: "Contactar Ventas",
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Planes para todos los
            <span className="bg-gradient-hero bg-clip-text text-transparent"> tamaños</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comienza gratis y escala cuando lo necesites. Sin sorpresas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative ${plan.popular ? 'border-primary shadow-primary' : 'border-border/50'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-hero text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Más Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button 
                  asChild 
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                >
                  <Link to="/auth">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          Todos los planes incluyen 14 días de prueba gratis. No se requiere tarjeta de crédito.
        </p>
      </div>
    </section>
  );
};
