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

export interface IButtonProps {
  login?: string
}