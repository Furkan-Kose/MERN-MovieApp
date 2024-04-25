import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { UserType } from '../types';

const API_URL = 'http://localhost:5000';


const loginUser = async ({ email, password }: {email: string, password: string}) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  return response.data;
};

export const useLogin = () => {
  return useMutation({ mutationKey: ['login'], mutationFn: loginUser });
};


const registerUser = async ({ username, email, password }: UserType) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
  return response.data;
};

export const useRegister = () => {
  return useMutation({ mutationKey: ['register'], mutationFn: registerUser });
};


const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/api/auth/logout`);
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export const useLogout = () => {
  return useMutation({ mutationKey: ['logout'], mutationFn: logoutUser });
}







// export const getUserFromToken = (token: string) => {
//   const decodedToken: { username: string, email: string } = jwtDecode(token);
//   const { username, email } = decodedToken;
//   return { username, email };
// };

// Kullanıcı Bilgilerini Getirme
// const getUserInfo = async () => {
//   const response = await axios.get(`${API_URL}/api/user-info`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`, // Bu token'i daha güvenli bir şekilde saklamayı düşünmelisiniz.
//     },
//   });
//   return response.data;
// };

// export const useUserInfo = () => {
//   return useQuery('user-info', getUserInfo);
// };
