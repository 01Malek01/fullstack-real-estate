import { toast } from "react-toastify"
import { api } from "./useProperties"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import dayjs from "dayjs"
import UserContext from '../../Context/UserContext';

export const useBookVisit = (onSettled) => {
 const { userDetails, setUserDetails } = useContext(UserContext);


 /*
 props : {
 email,resdId,date
 }
 */
 const bookVisitRequest = async ({ email, propertyId, date }) => {
  try {
   api.post(`/users/bookVisit/${propertyId}`,
    {
     email: email,
     date: dayjs(date).format('DD/ MM/ YYYY'),
    },
    {
     headers: {
      Authorization: `Bearer ${userDetails.token}`

     }
    })
   setUserDetails(prev => ({ ...prev, bookings: [{...prev.bookings}, { propertyId, date: dayjs(date).format('DD/ MM/ YYYY') }] }));
  } catch (err) {
   toast.error(err.message)
  }
 }
 const { mutate: bookVisit, isLoading } = useMutation({
  mutationKey: ['bookVisit'],
  mutationFn: bookVisitRequest,
  onSuccess: () => {
   toast.success('Visit booked successfully')
  },
  onError: ({ res }) => {
   toast.error(res.data.message)
  },
  onSettled: () => {
   onSettled()
  }
 })
 return { bookVisit, isLoading }
}