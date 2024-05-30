import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/contants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClinet = useQueryClient();
  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  //Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    error,
    isLoading,
    //Initially data will not exists so that is why we have to assign it to empty objects
    data: { data: bookings, count } = {},
  } = useQuery({
    //As a dependency array of useQuery, The big strength of Query
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE-Fetching
  let pageCount = Math.ceil(count / PAGE_SIZE);

  // 1. PreFeching the previous page
  if (page > 1)
    queryClinet.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  //2. Prefetching the next page
  if (page < pageCount)
    queryClinet.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  return { error, isLoading, bookings, count };
}
