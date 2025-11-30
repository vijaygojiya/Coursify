import { IUser } from "./types";

export interface ILesson {
  id: string;
  title: string;
  position: number;
  contentType: "video";
  videoUrl: string;
  thumbnail: string;
  duration: number;
}

export interface IModule {
  title: string;
  lessons: ILesson[];
}

export interface ICourse {
  title: string;
  status: "draft" | "published" | "archived";
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  isFree: boolean;
  thumbnailUrl?: string;
  modules: IModule[];
}

interface IReview {
  rating: number;
  user: IUser;
  comment: string;
}

export interface TCourse {
  instructor: Omit<IUser, "role"> & { role: "instructor" };
  avgRating: number;
  reviews: IReview[];
  isFav: boolean;
  isEnrolled: boolean;
}
