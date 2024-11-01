import axios from 'axios';
import {API_BASE_URL} from './apiConstant';
import {fireAuth} from '@/services/firebase';
const getToken = async () => {
  const authToken = await fireAuth.getFireAuthToken();
  return authToken ?? '';
};

const axiosClient = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    if (response.data.status !== undefined) {
      if (response.data.status) {
        return response;
      }
      return Promise.reject(response);
    }
    return response;
  },
  function (error) {
    if (
      axios.isAxiosError<{
        message: string;
        status: boolean;
        statusCode: number;
      }>(error) &&
      error.response
    ) {
      let res = error.response;
      console.log('===========', JSON.stringify(res, null, 8));
      //   const message = error.response?.data?.message ?? 'Something went wrong!';
      //   if (res.status === 401 && store.getState().user.isLoggedIn) {
      //     showToast("Oops! You've been logged out. Please log in again.");
      //     store.dispatch(logoutAction());
      //   } else {
      //     showToast(message);
      //   }
    } else {
      if (error.message) {
        // showToast(error.message);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
