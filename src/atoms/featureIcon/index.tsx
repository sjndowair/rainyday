interface IFeatureIconProps {
  key: string;
  icon: JSX.Element;
  onClick: () => void;
  isBookMark: Set<number>;
}

const FeatureIcon = ({ icon, key, onClick, isBookMark }: IFeatureIconProps) => {
  const isActive = (key: number) => {
    return isBookMark.has(Number(key));
  };
  return (
    <button
      key={key}
      onClick={onClick}
      className="flex items-center space-x-1 focus:outline-none group"
      // isBookMark={isActive}
    >
      {icon}
    </button>
  );
};
export default FeatureIcon;
