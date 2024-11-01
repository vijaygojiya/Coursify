// import Config from 'react-native-config';

// export const API_BASE_URL = Config.API_BASE_URL;
export const API_BASE_URL = 'http://localhost:4000/api/v1/';

export const HTTP_METHODS = {
  get: 'GET',
  delete: 'DELETE',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
};

export const apiEndpoints = {
  user: {
    createUser: () => 'user',
    getCurrentUser: () => 'me',
  },
};
