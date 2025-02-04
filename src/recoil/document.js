import { atomFamily } from 'recoil';

export const documentState = atomFamily({
  key: 'documentState',
  default: {
    title: '',
    isEditing: true,
    showValidator: false
  }
});

export const documentListState = atomFamily({
  key: 'documentListState',
  default: {
    documents: [],
    isLoading: false,
    error: null
  }
}); 