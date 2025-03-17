import { Control } from "react-hook-form";
import TextInput from "../../../app/shared/components/TextInput";
// import { useCostOfLiving } from "../../../lib/hooks/useCostOfLiving";
import { Button } from "@mui/material";
import axios from "axios";
import { CostOfLiving } from "../../../lib/types";
import { JSX, useCallback, useEffect, useReducer, useState } from "react";

type Props = {
  control: Control<{
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    details?:
      | {
          costOfFood: number;
          taxiCost: number;
          apartmentCost: number;
          rentCost: number;
        }
      | undefined;
  }>;

  cityName?: string;
};

type CostDetails = {
  costOfFood: number;
  taxiCost: number;
  apartmentCost: number;
  rentCost: number;
};

const costReducer = (state: CostDetails, action: Partial<CostDetails>) => ({
  ...state,
  ...action,
});

export default function CityDetailsInputs({ control, cityName }: Props) {
  const [isPressed, setIsPressed] = useState(false);
  const [autoField, setAutoField] = useState<JSX.Element>();

  const [costDetails, dispatch] = useReducer(costReducer, {
    costOfFood: 0,
    taxiCost: 0,
    apartmentCost: 0,
    rentCost: 0,
  });

  const handleAutoFill = async () => {
    setIsPressed(true);
  };

  const fetchCostOfLiving = useCallback(async (cityName?: string) => {
    if (!cityName) return;

    try {
      const res = await axios.get<CostOfLiving>(
        `http://localhost:5002/:${cityName}?USD`
      );

      if (res.data.costs.length === 0) {
        setAutoField(<>There is no such city</>);
      } else {
        setAutoField(<>Details successfully filled</>);

        const newCostDetails: Partial<CostDetails> = {};

        res.data.costs.map((cost) => {
          const formattedCost = +cost.cost.replace(",", "");

          switch (cost.item) {
            case "Meal, Inexpensive Restaurant":
              newCostDetails.costOfFood = formattedCost;
              break;
            case "Taxi 1km (Normal Tariff)":
              newCostDetails.taxiCost = formattedCost;
              break;
            case "Price per Square Meter to Buy Apartment in City Centre":
              newCostDetails.apartmentCost = formattedCost;
              break;
            case "Apartment (1 bedroom) in City Centre":
              newCostDetails.rentCost = formattedCost;
              break;
            default:
              break;
          }
        });

        dispatch(newCostDetails);
      }
    } catch (error) {
      console.log(error);
      setAutoField(<>Unknown error occured during details filling</>);
    }
  }, []);

  useEffect(() => {
    if (isPressed) {
      fetchCostOfLiving(cityName);
    }
  }, [cityName, fetchCostOfLiving, isPressed]);

  return (
    <>
      <Button onClick={handleAutoFill}>Autofill details</Button>
      {autoField}
      <TextInput
        label="Meal, inexpensive restaurant, USD"
        control={control}
        name="details.costOfFood"
        autoValue={costDetails.costOfFood || undefined}
      />
      <TextInput
        label="Taxi Cost (1 km), USD"
        control={control}
        name="details.taxiCost"
        autoValue={costDetails.taxiCost || undefined}
      />
      <TextInput
        label="Apartment Cost (1 square meter), city center, USD"
        control={control}
        name="details.apartmentCost"
        autoValue={costDetails.apartmentCost || undefined}
      />
      <TextInput
        label="Rent Cost (1 month), city center, USD"
        control={control}
        name="details.rentCost"
        autoValue={costDetails.rentCost || undefined}
      />
    </>
  );
}
