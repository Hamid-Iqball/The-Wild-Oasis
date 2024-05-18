import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabin() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"], //data will be read from the cache ,if used somewhere else in this project
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
