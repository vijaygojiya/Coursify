import {getCurrentUserInfoApi} from '@/apis/userApis';
import {ApiResponse} from '@/typings/apis';
import {IUser} from '@/typings/types';

import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

const useCurrentUser = (
  queryConfig: Omit<
    UseQueryOptions<AxiosResponse<ApiResponse<IUser>>>,
    'queryKey' | 'select'
  > = {},
) => {
  const result = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserInfoApi,
    select: ({data}) => data.data,
    staleTime: Infinity,
    enabled: false,
    ...queryConfig,
  });
  return result;
};

export default useCurrentUser;
