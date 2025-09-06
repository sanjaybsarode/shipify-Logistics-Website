import React, { useState, useEffect, useRef } from 'react';

// Easing function for smooth animation
const easeOutQuad = (t: number): number => t * (2 - t);

const stats = [
  { label: 'Countries Served', value: 120, suffix: '+' },
  { label: 'On-time Delivery', value: 98.7, suffix: '%', decimals: 1 },
  { label: 'Warehouses Managed', value: 45, suffix: '' },
  { label: 'Million Tonnes/Year', value: 2.5, suffix: 'M', decimals: 1 },
];

const AnimatedStat: React.FC<{
  label: string;
  endValue: number;
  suffix: string;
  decimals?: number;
  startAnimation: boolean;
}> = ({ label, endValue, suffix, decimals = 0, startAnimation }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2000; // 2 seconds

  useEffect(() => {
    if (!startAnimation) return;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - (startTimeRef.current || timestamp);
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      const nextValue = easedProgress * endValue;
      setCurrentValue(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      startTimeRef.current = null;
    };
  }, [startAnimation, endValue]);

  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-extrabold text-white">
        {currentValue.toFixed(decimals)}
        <span className="text-green-400">{suffix}</span>
      </p>
      <p className="mt-1 text-sm md:text-base font-medium text-slate-300 tracking-wide">{label}</p>
    </div>
  );
};

const AnimatedStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the component is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="bg-slate-900/50 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8 border border-white/10"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <AnimatedStat
            key={index}
            label={stat.label}
            endValue={stat.value}
            suffix={stat.suffix}
            decimals={stat.decimals}
            startAnimation={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedStats;
