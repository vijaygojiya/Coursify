import { ICourse } from '@/typings/types';
import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from '@react-native-firebase/firestore';
import { fireCollections } from './fireConst';
import { db } from './userServices';
import { fireAuth } from './fireAuth';
import { getUniqueId } from '@/utils';

const coursesCollection = collection(db, fireCollections.courses);
const modulesCollection = collection(db, fireCollections.courses);
const lessonsCollection = collection(db, fireCollections.courses);

export const createCourse = async (course: ICourse) => {
  const userId = fireAuth.currentUser?.uid;
  if (!userId) {
    throw Error('User not found!');
  }
  const courseId = getUniqueId();
  const courseRef = doc(coursesCollection, courseId);
  const batch = writeBatch(db);

  const moduleIds: string[] = [];

  for (const module of course.modules) {
    const moduleId = getUniqueId();
    const moduleRef = doc(modulesCollection, moduleId);
    moduleIds.push(moduleId);

    const lessonIds: string[] = [];

    for (const lesson of module.lessons) {
      const lessonId = getUniqueId();
      const lessonRef = doc(lessonsCollection, lessonId);

      lessonIds.push(lessonId);
      batch.set(lessonRef, {
        ...lesson,
        id: lessonId,
        moduleId,
        createdAt: serverTimestamp(),
      });
    }

    batch.set(moduleRef, {
      id: moduleId,
      title: module.title,
      description: module.description || '',
      order: module.order,
      lessonIds,
      courseId,
      createdAt: serverTimestamp(),
    });
  }

  batch.set(courseRef, {
    id: courseId,
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnail || '',
    category: course.category,
    tags: course.tags,
    isFree: course.isFree,
    rating: course.rating,
    totalDuration: course.totalDuration,
    moduleIds,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await batch.commit();

  return courseId;
};
