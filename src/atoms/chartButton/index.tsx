import { useThemeStore } from "../../store";

interface Props {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}

export default function ChartButton({ onClick, active, children }: Props) {
  const { isDarkMode } = useThemeStore();

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${
        active
          ? isDarkMode
            ? "bg-blue-500 text-white"
            : "bg-purple-500 text-white"
          : isDarkMode
          ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
