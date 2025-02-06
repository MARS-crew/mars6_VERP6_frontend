

import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/auth/auth';


export function useRquest(docId){
    const auth = useRecoilValue(authState);
    const setRequestList = useSetRecoilState(requestListState(docId));
    //const queryClient = useQueryClient();

    //요청 리스트 조회
    const getRequestMutation  = useMutation({
        mutationFn:async(docId)=>{
            const response = await axiosInstance.get(`/doc-request/${docId}`,{
                headers:{
                    'Authorization': `Bearer ${auth.token}`
                }
            })
            return response.data;
        },
        onSuccess:(data)=>{
            console.log('[요청 목록 조회 성공]', data);
            setRequestList({ request: data.result || [] });
        },
        onError:(error)=>{
            console.log('문서조회 실패 :',error);
            throw error
        }
    })
    
    //요청 리스트 생성
    const createRequestMutation  = useMutation({
        mutationFn : async (mReuest) =>{
            try{
                const response = await axiosInstance.post('/doc-request/create',{
                    docId : docId,
                    externalUrl: mReuest.url,
                    originalFileName: mReuest.filename,
                    content: mReuest.content,
                }, {
                    headers: {
                      'Authorization': `Bearer ${auth.token}`
                    }
                });
                if (!response.data.isSuccess) {
                    throw new Error(response.data.message || '요청 생성 실패');
                }
                return response.data.result

            }catch(error){
                console.log('요청 생성 중 오류 발생', error);
                throw error;
            }
        },
        onSuccess:(newRequest)=>{
            console.log('[요청 생성 성공]', newRequest);
            setRequestList(prev => ({
                request: [...prev.request, newRequest]
            }));
        },
        error : (error)=>{
            console.log('요청 생성 실패 :',error)
            throw error;
        }
    })

    return{
        getRequest: getRequestMutation.mutateAsync,
        createRequest: createRequestMutation.mutateAsync,
        isLoading: getRequestMutation.isPending || createRequestMutation.isPending,
        requestList: useRecoilValue(requestListState(docId))
    }
    
}