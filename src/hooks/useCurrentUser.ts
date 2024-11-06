import {getCurrentUserInfoApi} from '@/apis/userApis';
import {ApiResponse} from '@/types/apis';
import {IUser} from '@/types/types';
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
    enabled: false,
    ...queryConfig,
  });
  return result;
};

export default useCurrentUser;
