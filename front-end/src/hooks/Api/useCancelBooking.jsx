import { useMutation } from "@tanstack/react-query"
import { api } from "./useProperties"
import { toast } from "react-toastify"
import { useContext } from "react"
import UserContext from "../../Context/UserContext"

export const useCancelBooking = () => {
 const { setUserDetails, userDetails: { bookings, token } } = useContext(UserContext);
 const cancelBookingRequest = async ({ propertyId, email }) => {
  try {
   console.log('cancelling..:', propertyId);
   const res = await api.post(`/users/cancelBooking/${propertyId}`, {
    email: email,
   }
    , {
     headers: {
      Authorization: `Bearer ${token}`
     }
    }
   );
   setUserDetails(prev => ({ ...prev, bookings: prev.bookings.bookVisits?.filter((booking) => booking.propertyId !== propertyId) }));

   return res
  } catch (err) {
   toast.error(err.message)
  }
 }
 const { mutate: cancelBooking, isLoading } = useMutation({
  mutationKey: ['cancelBooking'],
  mutationFn: cancelBookingRequest,
  onSuccess: () => {
   toast.success('Booking cancelled successfully');
  },
  onError: ({ res }) => {
   toast.error(res.data.message)
  }
 })
 return { cancelBooking, isLoading }
}