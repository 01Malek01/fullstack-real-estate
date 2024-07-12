import axios from "axios"
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { useQuery } from '@tanstack/react-query'

export const api = axios.create({
 baseURL: "http://localhost:5000/api",
 withCredentials: true,
})
export const useProperties = () => {
 const getPropertiesRequest = async () => {
  
  try {
   const res = await api.get('/residencies/allresdencies',{
    timeout: 10 * 1000
   })
   if(res.status === 400 || res.status === 500){
    throw res.data
   }
const data = res.data
   return data
  } catch (err) {
   toast.error('Something went wrong');
   throw new Error(err.message);
  }
  
 }
 
 const {data,isError,isLoading,refetch} = useQuery({
  queryKey: ['properties'],
  queryFn: getPropertiesRequest
 });
 return {data,isError,isLoading,refetch}
}