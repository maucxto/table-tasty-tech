import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, LogOut, Settings, BarChart3, QrCode, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-glow">
                <Utensils className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Click&EAT</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              ¡Bienvenido a tu Dashboard!
            </h1>
            <p className="text-muted-foreground">
              Aquí podrás gestionar tu restaurante, menú, órdenes y mucho más.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Órdenes Hoy</CardTitle>
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Próximamente</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Productos</CardTitle>
                <Utensils className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Agrega tu menú</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Mesas</CardTitle>
                <QrCode className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Configura tus mesas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Staff</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Tú</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Primeros Pasos</CardTitle>
              <CardDescription>
                Completa estos pasos para comenzar a usar Click&EAT
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Configura tu restaurante</h3>
                  <p className="text-sm text-muted-foreground">
                    Personaliza tu marca, logo y colores
                  </p>
                </div>
                <Button variant="outlineHero" size="sm">
                  Configurar
                </Button>
              </div>

              <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Agrega tu menú</h3>
                  <p className="text-sm text-muted-foreground">
                    Crea categorías y productos para tu menú digital
                  </p>
                </div>
                <Button variant="outlineHero" size="sm">
                  Agregar Menú
                </Button>
              </div>

              <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Genera códigos QR</h3>
                  <p className="text-sm text-muted-foreground">
                    Crea códigos QR para tus mesas
                  </p>
                </div>
                <Button variant="outlineHero" size="sm">
                  Generar QRs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
