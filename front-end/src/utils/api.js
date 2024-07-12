export const   getFavorites = async () => {
  const { user, getAccessTokenSilently } = useAuth0();
  

  const token = await getAccessTokenSilently();
  try {
   const res = await api.post('/users/allFav', {
    email: user?.email,
   }, {
    headers: {
     Authorization: `Bearer ${token}`
    }
   });

   // Assuming res.data["favResidencesId"] is an array of favorites IDs
   return res?.data["favResidencesId"] ; // Return an empty array if no favorites
  } catch (err) {
   throw new Error(err.message);
  }
 };