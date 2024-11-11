import { IMainHomePostProps, IMainHomeStoryProps } from "../types/mainHomepage";
import { IMyPageProps } from "../types/create-mypage";

export const STORY_DUMMY_DATA: IMainHomeStoryProps[] = [
  {
    id: 1,
    username: "rainlover",
    avatar: "/placeholder.svg?height=60&width=60",
    outfit: "Yellow raincoat",
  },
  {
    id: 2,
    username: "puddlejumper",
    avatar: "/placeholder.svg?height=60&width=60",
    outfit: "Blue wellies",
  },
  {
    id: 3,
    username: "stormchaser",
    avatar: "/placeholder.svg?height=60&width=60",
    outfit: "Waterproof jacket",
  },
  {
    id: 4,
    username: "cozycafe",
    avatar: "/placeholder.svg?height=60&width=60",
    outfit: "Warm sweater",
  },
];

export const POST_DUMMY_DATA: IMainHomePostProps[] = [
  {
    id: 1,
    username: "rainlover",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Loving my new yellow raincoat! Perfect for this weather. #RainyDayStyle",
    image: "/placeholder.svg?height=400&width=400",
    outfit: "Yellow raincoat",
    likes: 120,
    comments: 15,
    shares: 5,
  },
  {
    id: 2,
    username: "puddlejumper",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "These blue wellies are not just fashionable, but also practical! #RainyDayFashion",
    outfit: "Blue wellies",
    likes: 45,
    comments: 8,
    shares: 2,
  },
];

export const MYPAGE_DUMMY_DATA: IMyPageProps[] = [
  {
    id: 1,
    content:
      "Enjoying a cozy day indoors with my favorite book and a warm cup of tea. Perfect rainy day activity! #RainyDayReads",
    image: "/placeholder.svg?height=300&width=400",
    outfit: "Comfy sweater and fuzzy socks",
    likes: 89,
    comments: 12,
    shares: 3,
    date: "2 hours ago",
  },
  {
    id: 2,
    content:
      "Just got these amazing new rain boots! Can't wait to test them out in the puddles. #RainyDayFashion",
    image: "/placeholder.svg?height=300&width=400",
    outfit: "Yellow rain boots and matching raincoat",
    likes: 156,
    comments: 24,
    shares: 7,
    date: "1 day ago",
  },
];

export const CONTANT = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];