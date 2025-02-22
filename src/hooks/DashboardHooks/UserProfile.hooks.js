import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/users.services';

const useUserProfile = () => {
    const fetchUser = async () => {
        const cachedUser = localStorage.getItem('user');
        if (!cachedUser) {
            throw new Error('User data not found in cache');
        }
        const parsedUser = JSON.parse(cachedUser);
        if (!parsedUser.user || !parsedUser.user.id) {
            throw new Error('Invalid user data in cache');
        }
        return await getUserById(parsedUser.user.id);
    };

    const { data: user, error, isLoading: loading } = useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUser,
        staleTime: Infinity,
    });

    return { user, loading, error };
};

export default useUserProfile;