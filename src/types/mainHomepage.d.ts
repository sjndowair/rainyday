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
