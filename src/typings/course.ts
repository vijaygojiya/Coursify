import {IUser} from './types';

interface ILesson {
  title: string;
  position: number;
  contentType: 'video';
  videoUrl: string;
  duration: number;
  textContent?: string | undefined;
}

interface IModule {
  title: string;
  position: number;
  lessons: Array<ILesson>;
}

export interface ICourse {
  title: string;
  status: 'draft' | 'published' | 'archived';
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  isFree: boolean;
  thumbnailUrl?: string;
  modules: Array<IModule>;
}

interface IReview {
  rating: number;
  user: IUser;
  comment: string;
}

export interface TCourse {
  instructor: Omit<IUser, 'role'> & {role: 'instructor'};
  avgRating: number;
  reviews: Array<IReview>;
  isFav: boolean;
  isEnrolled: boolean;
}
