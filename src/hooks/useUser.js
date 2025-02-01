import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/atoms/userAtom';
import { getUser } from '../api/userApi';

export function useUser() {
  const [user, setUser] = useRecoilState(userAtom);

  const query = useQuery(['user'], getUser, {
    onSuccess: (data) => {
      setUser(data);
    },
  });

  return { user, ...query };
}
