import { atomFamily } from 'recoil';

export const requestListstate = atomFamily({
    key:'requestStatus',
    default:{
        request: []
    }
})