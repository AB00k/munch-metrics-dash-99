
import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimal?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  prefix = "",
  suffix = "",
  decimal = false
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;
    countRef.current = 0;
    setCount(0);
    
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const current = Math.floor(easeOutQuart * value);
      
      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }
      
      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);

  const formatValue = (val: number) => {
    if (decimal) {
      return val.toFixed(2);
    }
    return val.toLocaleString();
  };

  return (
    <span className="tabular-nums">
      {prefix}{formatValue(count)}{suffix}
    </span>
  );
};

export default AnimatedCounter;
