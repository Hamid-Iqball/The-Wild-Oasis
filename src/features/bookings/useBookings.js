import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

function useBookings() {
  const {
    error,
    isLoading,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBooking,
  });

  return { error, isLoading, bookings };
}

export default useBookings;
