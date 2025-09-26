import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateCourseStackParamsList } from '@/typings/navigation';
import {
  CourseCurriculumScreen,
  CourseOverviewScreen,
  CoursePreviewScreen,
} from '@/screens';
import { CreateCourseProvider } from '@/contexts';

const Stack = createNativeStackNavigator<CreateCourseStackParamsList>();

const CreateCourseNavigator = () => {
  return (
    <CreateCourseProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CourseOverview" component={CourseOverviewScreen} />
        <Stack.Screen
          name="CourseCurriculum"
          component={CourseCurriculumScreen}
        />
        <Stack.Screen name="CoursePreview" component={CoursePreviewScreen} />
      </Stack.Navigator>
    </CreateCourseProvider>
  );
};

export default CreateCourseNavigator;
