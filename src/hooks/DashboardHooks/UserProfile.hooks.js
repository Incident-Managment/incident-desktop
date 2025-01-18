import { useState, useEffect } from 'react';
import { getUserById } from '../../services/users.services';

const useUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const cachedUser = localStorage.getItem('user');
                if (!cachedUser) {
                    throw new Error('User data not found in cache');
                }
                const parsedUser = JSON.parse(cachedUser);
                if (!parsedUser.user || !parsedUser.user.id) {
                    throw new Error('Invalid user data in cache');
                }
                const userData = await getUserById(parsedUser.user.id);
                setUser(userData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

export default useUserProfile;