const RainEffect = ({ delay }: { delay: number }) => {
  return (
    <div
      className="absolute -top-10 w-[0.8px] h-8 bg-blue-500 opacity-50 rounded-full "
      style={{
        left: `${Math.random() * 100}%`,
        animation: `fall 1.5s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

export default RainEffect;
