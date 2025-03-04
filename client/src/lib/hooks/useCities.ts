import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useCities = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: cities, isPending } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await agent.get<City[]>("/cities");
      return response.data;
    },
  });

  const { data: city, isLoading: isLoadingCity } = useQuery({
    queryKey: ["city", id],
    queryFn: async () => {
      const response = await agent.get<City>(`/cities/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createCity = useMutation({
    mutationFn: async (city: City) => {
      const response = await agent.post("/cities", city);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cities"],
      });
    },
  });

  const updateCity = useMutation({
    mutationFn: async (city: City) => {
      await agent.put(`/cities/${id}`, city);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cities"],
      });
    },
  });

  return {
    cities,
    isPending,
    city,
    isLoadingCity,
    createCity,
    updateCity,
  };
};
