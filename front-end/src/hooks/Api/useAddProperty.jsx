import { useMutation } from "@tanstack/react-query"
import { api, useProperties } from "./useProperties"
import { useUser } from "../../Context/UserContext";
import { toast } from "react-toastify";

export const useAddProperty = () => {
 const { refetch: refetchProperties } = useProperties();

 const { userDetails: { token } } = useUser();
 const addPropertyRequest = async (data) => {
  console.log(data);
  const res = await api.post('/residencies/create',
   {
    data
   },
   {
    headers: {
     Authorization: `Bearer ${token}`
    }
   }
  )
 }

 const { mutate: addProperty, isLoading } = useMutation({
  mutationKey: ['addProperty'],
  mutationFn: addPropertyRequest,
  onError: (error) => {
   toast.error(error.message)
  },
  onSuccess: () => {
   toast.success('Property added successfully')
  },
  onSettled: () => {
   refetchProperties();
  }
 })
 return { addProperty, isLoading }
}
