import { api } from "./useProperties"; //axios instance
import { useMutation } from "@tanstack/react-query";
export const useCreateUser = () => {

 const createUserRequest = async ({token, email}) => {
  try {
   const res = await api.post('/users/register', {
    email,

   }, {
    headers: {
     Authorization: `Bearer ${token}`,
    }
   });
   const data = await res.json();

   if (!res.ok) {

    throw new Error(data.message);
   }
   return data;
  } catch (err) {
   throw new Error(err.message);
  }
 };
 const { mutate: createUser } = useMutation({
  mutationKey: ['createUser'],
  mutationFn: createUserRequest
 });
 return { createUser };
}