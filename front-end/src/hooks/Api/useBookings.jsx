import { useAuth0 } from "@auth0/auth0-react";
import  { useUser } from "../../Context/UserContext";
import { api } from "./useProperties";
import { useQuery } from "@tanstack/react-query";

export default function useBookings() {
 const { user, getAccessTokenSilently } = useAuth0();
 const { setUserDetails, userDetails: { token } } = useUser();

 const getBookings = async () => {
  const accessToken = await getAccessTokenSilently();
  try {
   const res = await api.post('/users/allBookings', {
    email: user?.email
   },
    {
     headers: {
      Authorization: `Bearer ${accessToken}`
     }
    });
   setUserDetails((prev) => ({ ...prev, bookings: res.data }));
   return res.data;
  } catch (err) {
   throw new Error(err.message);
  }
 };

 const { data: allBookings, isError, isLoading, refetch } = useQuery({
  queryKey: ['bookings'],
  queryFn: getBookings,
  enabled: !!user && !!token, // Only fetch when user and token are available
  staleTime: 30000, // Refresh every 30 seconds
 
 });

 return { allBookings, isError, isLoading, refetch };
}
