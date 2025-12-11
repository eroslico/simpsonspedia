import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Users, Tv, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Personajes",
    description: "Explora todos los personajes de Springfield y más allá",
    icon: Users,
    href: "/characters",
    color: "bg-primary hover:bg-primary/90",
    emoji: "👥",
  },
  {
    title: "Episodios",
    description: "Descubre cada episodio de la serie animada más larga",
    icon: Tv,
    href: "/episodes",
    color: "bg-secondary hover:bg-secondary/90",
    emoji: "📺",
  },
  {
    title: "Locaciones",
    description: "Visita los lugares más icónicos como el Bar de Moe",
    icon: MapPin,
    href: "/locations",
    color: "bg-accent hover:bg-accent/90",
    emoji: "🗺️",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-sky-gradient">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-float">☁️</div>
          <div className="absolute top-20 right-20 text-6xl animate-float" style={{ animationDelay: "1s" }}>☁️</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-float" style={{ animationDelay: "0.5s" }}>☁️</div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 animate-bounce-in">
              <span className="text-7xl md:text-9xl">🍩</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6 text-shadow-md animate-bounce-in" style={{ animationDelay: "0.1s" }}>
              Simpsonspedia
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-body max-w-2xl mx-auto animate-bounce-in" style={{ animationDelay: "0.2s" }}>
              La enciclopedia definitiva del universo de Los Simpsons. 
              Descubre personajes, episodios y lugares de Springfield.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
                <Link to="/characters">
                  Explorar Personajes
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-foreground">
          ¿Qué quieres explorar? 🔍
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.href}
              className="group relative bg-card rounded-3xl p-6 md:p-8 border-4 border-border shadow-lg hover:shadow-2xl hover:border-primary transition-all duration-300 hover:-translate-y-2 animate-bounce-in"
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              <div className="text-5xl mb-4">{feature.emoji}</div>
              <h3 className="text-2xl font-heading font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body mb-4">
                {feature.description}
              </p>
              <span className="inline-flex items-center text-primary font-heading font-medium group-hover:gap-2 transition-all">
                Explorar <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-foreground">
            ¿Sabías que...? 🤔
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { stat: "750+", label: "Episodios emitidos", emoji: "📺" },
              { stat: "1989", label: "Año de estreno", emoji: "📅" },
              { stat: "35+", label: "Temporadas", emoji: "🏆" },
              { stat: "∞", label: "Predicciones cumplidas", emoji: "🔮" },
            ].map((fact, index) => (
              <div
                key={fact.label}
                className="bg-card rounded-2xl p-6 text-center border-2 border-border shadow-md animate-bounce-in"
                style={{ animationDelay: `${index * 100 + 600}ms` }}
              >
                <span className="text-4xl block mb-2">{fact.emoji}</span>
                <p className="text-4xl font-heading font-bold text-primary mb-1">{fact.stat}</p>
                <p className="text-muted-foreground font-body">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-xl mb-2">🍩 Simpsonspedia</p>
          <p className="text-sm opacity-70 font-body">
            Hecho con 💛 por fans de Los Simpsons
          </p>
          <p className="text-xs opacity-50 mt-2 font-body">
            Los Simpsons™ y todos los personajes relacionados son propiedad de 20th Century Fox
          </p>
        </div>
      </footer>
    </div>
  );
}
