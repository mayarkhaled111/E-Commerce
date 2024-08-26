import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { clearCartApi } from "../../APIS/allCartApis";

export default function useMutationCart(fn) {
  const queryClient = useQueryClient()
  return useMutation(
    {
      mutationFn:fn,
      onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: ['proInCart'] })
        // to prevent loading when clear cart
        if(fn==clearCartApi)
            queryClient.setQueriesData('proInCart',null)
      }
    })
}
