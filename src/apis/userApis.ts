import {ApiResponse} from '@/types/apis';
import axiosClient from '.';
import {apiEndpoints, HTTP_METHODS} from './apiConstant';
import {IUser} from '@/types/types';

export const createUserApi = async ({
  email,
  firebaseId,
  name,
}: {
  email: string;
  firebaseId: string;
  name: string;
}) => {
  return axiosClient<ApiResponse<IUser>>({
    method: HTTP_METHODS.post,
    url: apiEndpoints.user.createUser(),
    data: {
      email,
      firebaseId,
      name,
    },
  });
};

export const getCurrentUserInfoApi = async () => {
  return axiosClient<ApiResponse<IUser>>({
    method: HTTP_METHODS.get,
    url: apiEndpoints.user.getCurrentUser(),
  });
};

export const updateCurrentUserInfoApi = async (
  data: Partial<Omit<IUser, 'firebaseId' | 'email'>>,
) => {
  return axiosClient<ApiResponse<IUser>>({
    method: HTTP_METHODS.patch,
    url: apiEndpoints.user.getCurrentUser(),
    data: data,
  });
};

export const deleteUser = async () => {
  return axiosClient<ApiResponse<unknown>>({
    method: HTTP_METHODS.delete,
    url: apiEndpoints.user.createUser(),
  });
};
