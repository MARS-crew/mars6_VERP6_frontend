import { atom } from 'recoil';
import { getCookie, setCookie, removeCookie } from '../../utils/cookies';

const token = getCookie('auth_token');
const userStr = getCookie('auth_user');
const user = userStr ? JSON.parse(userStr) : null;

export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: !!token,
    token: token,
    user: user
  }
});

export const saveUserToCookie = (user) => {
  if (user) {
    setCookie('auth_user', JSON.stringify(user));
  } else {
    removeCookie('auth_user');
  }
};