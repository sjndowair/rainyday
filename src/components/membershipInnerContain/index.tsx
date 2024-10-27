import { ILayOutProps } from "../../types/create-membership";
import { Umbrella } from "lucide-react";

const MembershipInnerContain = ({ children }: ILayOutProps) => {
  return (
    <div className="relative  z-50 p-8">
      <div className="text-center mb-8">
        <Umbrella className="mx-auto h-12 w-12 text-blue-400" />
        <h2 className="mt-4 text-3xl font-bold text-white">Rainy Day</h2>
        <p className="mt-2 text-gray-400">
          Hello! your created exclusive membership!
        </p>
        {children}
      </div>
    </div>
  );
};
export default MembershipInnerContain;
