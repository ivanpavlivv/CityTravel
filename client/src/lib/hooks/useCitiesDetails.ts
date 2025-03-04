import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useCitiesDetails = (id?: string) => {
  const queryClient = useQueryClient();

  const createCityDetails = useMutation({
    mutationFn: async (cityDetails: Details) => {
      await agent.post("/cities/details", cityDetails);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["citiesDetails"],
      });
    },
  });

  const updateCityDetails = useMutation({
    mutationFn: async (cityDetails: Details) => {
      await agent.put(`/cities/details/${id}`, cityDetails);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["citiesDetails"],
      });
    },
  });

  const deleteCityDetails = useMutation({
    mutationFn: async () => {
      await agent.delete(`/cities/details/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["citiesDetails"],
      });
    },
  });

  return {
    createCityDetails,
    updateCityDetails,
    deleteCityDetails,
  };
};
