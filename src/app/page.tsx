"use client";

import Navbar from "./Components/HomePage/Navbar";
import Search_Section from "./Components/HomePage/Search_Section";
import Footer from "./Components/HomePage/Footer";
import { ImSpinner11 } from "react-icons/im";

import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

interface LocalityWeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  rain_intensity: number;
  rain_accumulation: number;
}

interface WeatherApiResponse {
  status: string;
  message: string;
  device_type: number;
  locality_weather_data: LocalityWeatherData;
  locality_id: string;
}

export default function Home() {
  const [localityName, setLocalityName] = useState<string>("");
  const [localityId, setLocalityId] = useState<string | null>(null);

  const { isLoading, error, data } = useQuery<WeatherApiResponse>(
    ["weatherData", localityName],
    async () => {
      const { data } = await axios.get(
        `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`,
        {
          headers: {
            "X-Zomato-Api-Key": "6851653cfd4d27899154a235fde6aae1",
          },
        }
      );

      return data;
    },
    {
      enabled: !!localityName,
    }
  );

  const handleLocalitySelection = (name: string, id: string) => {
    setLocalityName(name);
    setLocalityId(id);
  };

  if (isLoading)
    return (
      <div className="flex w-full  items-center min-h-screen justify-center">
        <p className=" animate-spin text-3xl text-blue-600">
          <ImSpinner11 />
        </p>
      </div>
    );

  if (error) return `Error: ${(error as Error).message}`;

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <Search_Section
        localityName={localityName}
        localityId={localityId}
        onLocalitySelect={handleLocalitySelection}
      />
      <Footer />
    </div>
  );
}
