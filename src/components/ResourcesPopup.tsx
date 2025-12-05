import { useState, useEffect } from "react";
import { X, Gift, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ResourcesPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if popup was already shown this session
    const hasSeenPopup = sessionStorage.getItem('resourcesPopupSeen');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('resourcesPopupSeen', 'true');
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleNavigate = (path: string) => {
    setIsVisible(false);
    navigate(path);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
            <Gift className="h-8 w-8 text-primary-foreground" />
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            🎁 ¡Recursos GRATIS!
          </h3>
          
          <p className="text-muted-foreground mb-6">
            Comienza tu transformación hoy con nuestras guías y recetas gratuitas
          </p>

          <div className="space-y-3">
            <button
              onClick={() => handleNavigate('/recursos-gratis')}
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Sparkles className="h-4 w-4" />
              7 Recetas Gratis
            </button>
            
            <button
              onClick={() => handleNavigate('/guia-completa')}
              className="w-full bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
            >
              Guía Completa $27
            </button>

            <button
              onClick={handleClose}
              className="w-full text-muted-foreground text-sm hover:text-foreground transition-colors py-2"
            >
              Tal vez más tarde
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
