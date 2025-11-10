import { QrCode, BarChart3, Users, Smartphone, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: QrCode,
    title: "Códigos QR por Mesa",
    description: "Genera códigos QR únicos para cada mesa. Los clientes escanean y acceden al menú instantáneamente.",
  },
  {
    icon: Smartphone,
    title: "Menú Digital PWA",
    description: "Experiencia móvil perfecta. Funciona sin app, carga rápido y se ve increíble en cualquier dispositivo.",
  },
  {
    icon: Zap,
    title: "Pedidos en Tiempo Real",
    description: "Notificaciones instantáneas a cocina y barra. Actualiza estados y mantén a tu equipo sincronizado.",
  },
  {
    icon: Users,
    title: "Gestión de Personal",
    description: "Roles diferenciados para cocina, barra y caja. Cada quien ve solo lo que necesita.",
  },
  {
    icon: BarChart3,
    title: "Analytics Detallado",
    description: "Métricas de ventas, productos populares, horarios pico y más. Toma decisiones basadas en datos.",
  },
  {
    icon: Shield,
    title: "Seguro y Escalable",
    description: "Arquitectura multi-tenant con seguridad de nivel empresarial. Crece sin preocupaciones.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Todo lo que necesitas para
            <span className="bg-gradient-hero bg-clip-text text-transparent"> modernizar tu restaurante</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Funcionalidades diseñadas para optimizar cada aspecto de tu operación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center group-hover:shadow-glow transition-shadow">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
