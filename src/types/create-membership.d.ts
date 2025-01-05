export interface IFormProps {
  name: string;
  email: string;
}

export interface ILayOutProps {
  children?: JSX.Element | ReactNode | string | number;
}
export interface ILabelProps {
  htmlFor?: string;
  children?: React.ReactNode;
  className?: string;
  label?: string;
}


type TButtonType = "submit" | "button" | "reset" | undefined ;

export interface IButtonProps {
  login?: string;
  isLoading?: boolean;
  children? : string;
  type?: TButtonType;
  onClick?: () => void;
}