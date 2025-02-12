import { atom } from 'recoil';
import { getCookie } from '../../utils/cookies';

const token = getCookie('auth_token');

export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: !!token,
    token: token,
    user: null
  }
});