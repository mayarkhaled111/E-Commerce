import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { clearCartApi } from "../../APIS/allCartApis";

export default function useMutationWishList(fn) {
  const queryClient = useQueryClient()
  return useMutation(
    {
      mutationFn:fn,
      onSuccess:()=>{
        // to update ui 
        queryClient.invalidateQueries({ queryKey: ['proInList'] })
      }
    })
}
