import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CreateNewCourseStackScreenProps} from '@/typings/navigation';

const CourseCurriculum =
  ({}: CreateNewCourseStackScreenProps<'CourseCurriculum'>) => {
    return (
      <View>
        <Text>CourseCurriculum</Text>
      </View>
    );
  };

export default CourseCurriculum;

const styles = StyleSheet.create({});
