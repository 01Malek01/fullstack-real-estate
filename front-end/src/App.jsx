import { Suspense } from "react";
import "./App.css";
import Website from "./pages/Website";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Property from "./pages/Property/Property";
import { useAuth0 } from "@auth0/auth0-react";
import { UserProvider } from "./Context/UserContext";
import Bookings from "./pages/Bookings/Bookings";
import Favorites from "./pages/Favorites/Favorites"; // Import Favorites component

function App() {
  const client = new QueryClient();
  const { isLoading, error } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <QueryClientProvider client={client}>
      <UserProvider>
        <ToastContainer />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                {/* <Route path="/favorites" element={<Favorites />} /> Add Favorites route */}
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
