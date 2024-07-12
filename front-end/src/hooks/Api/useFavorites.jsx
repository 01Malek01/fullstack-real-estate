import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { api } from "./useProperties";
import { useQuery } from "@tanstack/react-query";

function useFavorites() {
 const { user, getAccessTokenSilently } = useAuth0();
 const queryRef = useRef();

 const getFavorites = async () => {
  const token = await getAccessTokenSilently();
  try {

   const res = await api.post('/users/allFav', {
    email: user?.email,
   }, {
    headers: {
     Authorization: `Bearer ${token}`
    }
   });
   data = res?.data["favResidencesId"];

   console.log('hook', data)
   return data;
  } catch (err) {
   throw new Error(err.message);
  }
 };

 const { data: allFavorites, isError, isLoading, refetch } = useQuery({
  queryKey: ['favorites'],
  queryFn: getFavorites,

  staleTime: 30000, // Refresh every 30 seconds,

 });

 // queryRef.current = refetch;

 // useEffect(() => {
 //  if (queryRef.current) {
 //   queryRef.current();
 //  }
 // }, [token]);

 return { allFavorites, isError, isLoading, refetch };
}

export default useFavorites;
