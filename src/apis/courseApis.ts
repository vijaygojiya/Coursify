import {ApiResponse} from '@/typings/apis';
import axiosClient from '.';
import {apiEndpoints, HTTP_METHODS} from './apiConstant';
import {IUser} from '@/typings/types';

export const createNewCourseApi = async (data: any) => {
  return axiosClient<ApiResponse<IUser>>({
    method: HTTP_METHODS.post,
    url: apiEndpoints.course.createNew(),
    data,
  });
};
