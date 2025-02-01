import { atomFamily } from 'recoil';

export const documentState = atomFamily({
  key: 'documentState',
  default: {
    title: '',
    isEditing: true,
    showValidator: false
  }
}); 