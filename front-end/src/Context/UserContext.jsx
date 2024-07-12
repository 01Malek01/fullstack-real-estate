import React, { createContext, useState, useContext, useEffect } from 'react';
import useFavorites from '../hooks/Api/useFavorites';
import useBookings from '../hooks/Api/useBookings';
// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
 // const { allFavorites } = useFavorites();
 // const { allBookings } = useBookings();
 const [userDetails, setUserDetails] = useState({
  favorites: [],
  bookings: [],
  token: null,
 });

 // useEffect(() => {
 //  setUserDetails((prev) => ({ ...prev, favorites: allFavorites }));
 //  setUserDetails((prev) => ({ ...prev, bookings: allBookings }));
 // }, [allFavorites, allBookings]);
 return (
  <UserContext.Provider value={{ userDetails, setUserDetails }}>
   {children}
  </UserContext.Provider>
 );
};

// Custom hook to use the UserContext
export const useUser = () => {
 const context = useContext(UserContext);
 if (!context) {
  throw new Error();
 }
 return context;
};

export default UserContext;
