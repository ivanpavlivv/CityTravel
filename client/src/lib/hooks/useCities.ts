import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { City } from "../types";

export const useCities = (id?: string) => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const { data: cities, isPending } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await agent.get<City[]>("/cities");
      return response.data;
    },
    enabled: !id && location.pathname === "/cities",
    staleTime: 1000 * 60 * 5,
  });

  const { data: city, isLoading: isLoadingCity } = useQuery({
    queryKey: ["city", id],
    queryFn: async () => {
      const response = await agent.get<City>(`/cities/${id}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
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

  const deleteCity = useMutation({
    mutationFn: async () => {
      await agent.delete(`/cities/${id}`);
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
    deleteCity,
  };
};
