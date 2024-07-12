import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { api } from "./useProperties";

export const useProperty = (propertyId) => {
 const getPropertyRequest = async () => {
  try {
   const res = await api.get(`/residencies/${propertyId}`,{
    timeout: 10 * 1000
   });
   if (res.status === 400 || res.status === 500) {
    throw res.data;
   }
   const data = res.data;
   return data;
  } catch (err) {
   toast.error("Something went wrong");
   throw new Error(err.message);
  }
 };

 const { data, isError, isLoading } = useQuery({
  queryKey: ["property"],
  queryFn: getPropertyRequest,
 });

 return { data, isError, isLoading };
};