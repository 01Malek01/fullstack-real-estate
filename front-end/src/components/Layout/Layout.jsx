import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '../../Context/UserContext';
import { useCreateUser } from '../../hooks/Api/useCreateUser';
import useFavorites from '../../hooks/Api/useFavorites';
import useBookings from '../../hooks/Api/useBookings';

function Layout() {
  useFavorites();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useUser();
  const { createUser } = useCreateUser();

  useEffect(() => {
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenSilently({
        authorizationParams: {
          redirect_uri: "http://localhost:5173/",
          audience: "http://localhost:5000",
          scope: "openId profile email "
        }
      });
      localStorage.setItem("access-token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      createUser({ token: res, email: user?.email });
      refetchFavorites(); // Fetch favorites after setting the token
    };
    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, createUser, setUserDetails]);

  // useEffect(() => {
  //   if (allBookings) {
  //     setUserDetails((prev) => ({ ...prev, bookings: allBookings }));
  //   }
  // }, [allBookings, setUserDetails]);

// useEffect(() => {
//   console.log(allFavorites)
// }, [allFavorites]);
  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
