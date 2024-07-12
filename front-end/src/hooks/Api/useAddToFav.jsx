import { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import { api } from './useProperties';
import { toast } from 'react-toastify'; // Ensure toast is imported
import { useUser } from '../../Context/UserContext';

export default function useAddToFav() {
    const {
        userDetails: { token },
        setUserDetails,
    } = useUser();
    const { user } = useAuth0();

    const addToFavRequest = async (resdId) => {
        try {
            const res = await api.post(`/users/toFav/${resdId}`, {
                email: user?.email
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return res.data;
        } catch (err) {
            toast.error(err.message);
            throw new Error(err); // Ensure the error is thrown so it's caught by onError
        }
    };

    const { mutate: likeProperty } = useMutation({
        mutationKey: ['likeProperty'],
        mutationFn: addToFavRequest,

        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            setUserDetails((prev) => {
                const favorites = prev.favorites || []; // Ensure favorites is an array
                return {
                    ...prev,
                    favorites: [...prev.favorites, Array.isArray(favorites) && favorites.includes(data?.resdId)
                        ? favorites.filter((fav) => fav !== data?.resdId)
                        : [favorites, data?.resdId],]
                };
            });
        },

    });

    return { likeProperty };
}
