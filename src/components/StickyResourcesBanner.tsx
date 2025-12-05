import { Gift } from "lucide-react";

export const StickyResourcesBanner = () => {
  const scrollToResources = () => {
    const element = document.getElementById('recursos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground py-2 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm md:text-base">
        <Gift className="h-4 w-4 md:h-5 md:w-5 animate-pulse" />
        <span className="font-medium">
          🎁 Recursos GRATIS para tu transformación
        </span>
        <button
          onClick={scrollToResources}
          className="ml-2 bg-background/20 hover:bg-background/30 text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-semibold transition-all hover:scale-105"
        >
          Ver Ahora
        </button>
      </div>
    </div>
  );
};
