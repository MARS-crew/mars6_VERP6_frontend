import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/auth/auth';

export function useAlert(docId){
    const auth = useRecoilValue(authState);

    const { data, isLoading, error} = useQuery({
        queryKey: ['dcheck',docId],
        queryFn: async () => {
          try {
            const response = await axiosInstance.get(`/docs/${docId}/has-unread`, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
            return response.data;
          } catch (error) {
            console.error('[문서 알림 조회 에러]', error);
            throw error;
          }
        },
      });

      

    return{
        data,
        isLoading,
        error
    }
}