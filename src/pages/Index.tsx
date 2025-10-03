import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Plans } from "@/components/Plans";
import { ContactForm } from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Benefits />
      <Plans />
      <ContactForm />
      
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            © 2024 Shaklee Bienestar. Embajadora Independiente.
          </p>
          <p className="text-xs opacity-60 mt-2">
            Productos y servicios de Shaklee Corporation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
