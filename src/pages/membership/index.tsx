import Form from "../../atoms/form";
import Input from "../../atoms/input";
import Layout from "../../layout";
// import Button from "../../atoms/button";
import { useState } from "react";
// import { CloudRain, Umbrella } from "lucide-react";

interface FormData {
  name: string;
  email: string;
}

export default function Membership() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900 p-4">
      <div className="relative max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 w-0.5 h-8 bg-blue-400 rounded-full"
              style={{
                top: "-50px",
                left: `${Math.random() * 100}%`,
                animation: `fall ${1 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 text-blue-400" />
            <h2 className="mt-4 text-3xl font-bold text-white">Rainy Day</h2>
            <p className="mt-2 text-gray-400">
              Hello! your created exclusive membership!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="yourName"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="yourEmail@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                your sex
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="men"
                    onChange={handleInputChange}
                    className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-300">men</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="woman"
                    onChange={handleInputChange}
                    className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-300">women</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Join Now
            </button>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
