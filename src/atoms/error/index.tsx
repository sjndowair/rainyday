

interface IErrorBoxProps {
  isEmailExists?: boolean;
  value?: string | number | JSX.Element;
}

const Error = ({isEmailExists, value}:IErrorBoxProps) => {
  return (
    <div
      className={`
        flex justify-center
        items-center  bg-gradient-to-b
        from-gray-700 to-gray-900 p-4 text-xl text-white max-w-[500px]
        w-full absolute z-10 font-bold py-4 rounded-2xl right-[50%] translate-x-2/4 top-[8rem]
        drop-shadow-2xl  transition-all duration-300
        
        `

      }
    >
      {value}
    </div>
  );
};

export default Error;
