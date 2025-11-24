import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import DigitalProduct from "./pages/DigitalProduct";
import FreeConsultation from "./pages/FreeConsultation";
import FreebieOffer from "./pages/FreebieOffer";
import PurchaseSuccess from "./pages/PurchaseSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="/descargo" element={<Disclaimer />} />
          <Route path="/guia-completa" element={<DigitalProduct />} />
          <Route path="/consulta-gratis" element={<FreeConsultation />} />
          <Route path="/recursos-gratis" element={<FreebieOffer />} />
          <Route path="/compra-exitosa" element={<PurchaseSuccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
