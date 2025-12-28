import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-12-29T23:59:59").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isExpired) {
    return (
      <div className="text-center text-muted-foreground font-medium">
        ¡La oferta ha terminado!
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <span 
                key={unit.value}
                className="text-2xl md:text-3xl font-bold text-primary-foreground animate-fade-in"
              >
                {String(unit.value).padStart(2, "0")}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
            {/* Decorative line between units */}
            {index < timeUnits.length - 1 && (
              <div className="absolute -right-2 md:-right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                <div className="w-1 h-1 rounded-full bg-primary/60" />
                <div className="w-1 h-1 rounded-full bg-primary/60" />
              </div>
            )}
          </div>
          <span className="text-xs md:text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
