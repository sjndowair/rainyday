import { InputHTMLAttributes } from "react";
import { ILabelProps } from "./create-membership";

export interface IMainHomeStoryProps {
  id: number;
  username: string;
  avatar: string;
  outfit: string;
}

export interface IMainHomePostProps extends IMainHomeStoryProps {
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface IRadioBoxProps
  extends ILabelProps,
    InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
