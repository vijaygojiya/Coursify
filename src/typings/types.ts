export interface IUser {
  firebaseId: string;
  email: string;
  name: string;
  profileImg?: string;
  bio?: string;
  role: 'instructor' | 'student';
  rating?: number;
  interest: Array<string>;
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  order: number;
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface ICourse {
  id: string;
  title: string;
  description: string;
  instructor: IUser;
  thumbnail?: string;
  category: string;
  tags: string[];
  isFree: boolean;
  price: number;
  rating: number;
  totalDuration: number;
  modules: Module[];
  reviews: Review[];
}

export interface Review {
  id: string;
  user: IUser;
  rating: number;
  comment: string;
  date: Date;
}
