import { atomFamily ,useSetRecoilState } from 'recoil';

export const requestListstate = atomFamily({
    key:'requestStatus',
    default:{
        request: []
    }
})