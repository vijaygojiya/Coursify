import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateCourseStackParamsList} from '@/typings/navigation';
import {CourseOverviewScreen} from '@/screens';

const Stack = createNativeStackNavigator<CreateCourseStackParamsList>();

const CreateCourseNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CourseOverview" component={CourseOverviewScreen} />
      <Stack.Screen name="CourseCurriculum" component={CourseOverviewScreen} />
      <Stack.Screen name="CoursePreview" component={CourseOverviewScreen} />
    </Stack.Navigator>
  );
};

export default CreateCourseNavigator;
