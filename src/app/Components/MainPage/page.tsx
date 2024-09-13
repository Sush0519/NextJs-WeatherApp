"use client";
import { Suspense, useEffect, useState } from "react";
import Main_Navbar from "../MainPage/Main_Navbar";
import { useQuery } from "react-query";
import { ImSpinner11 } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import { WiHumidity } from "react-icons/wi";
import { GiDroplets } from "react-icons/gi";
import { ImCompass2 } from "react-icons/im";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { IoRainy } from "react-icons/io5";
import axios from "axios";
import DateTimeDisplay from "../MainPage/DateTimeDisplay";
import { useSearchParams } from "next/navigation";

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

function MainPageContent() {
  const searchParams = useSearchParams();

  const localityIdFromUrl = searchParams.get("locality_id");
  const localityNameFromUrl = searchParams.get("localityName");

  const [localityId, setLocalityId] = useState<string>(localityIdFromUrl || "");
  const [localityName, setLocalityName] = useState<string>(
    localityNameFromUrl || ""
  );

  useEffect(() => {
    if (localityIdFromUrl && localityNameFromUrl) {
      setLocalityId(localityIdFromUrl);
      setLocalityName(localityNameFromUrl);
    }
  }, [localityIdFromUrl, localityNameFromUrl, searchParams]);

  const { isLoading, error, data } = useQuery<WeatherApiResponse>(
    ["weatherData", localityId],

    async () => {
      if (!localityId) {
        throw new Error("No localityId provided");
      }

      const { data } = await axios.get<WeatherApiResponse>(
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
      enabled: !!localityId,
    }
  );

  const firstData = data?.locality_weather_data || {
    temperature: 32,
    humidity: 60,
    wind_speed: 0.19,
    wind_direction: 269.2,
    rain_intensity: 9,
    rain_accumulation: 50,
  };

  const intTemperature = Math.floor(firstData?.temperature || 32);
  const intHumidity = Math.floor(firstData?.humidity || 60);
  const intRainAcc = Math.floor(firstData?.rain_accumulation || 50);
  const intRainInt = Math.floor(firstData?.rain_intensity || 9);
  const intWindSpeed = firstData?.wind_speed || 0.19;
  const intWindDir = firstData?.wind_direction || 269.2;

  if (isLoading)
    return (
      <div className="flex w-full  items-center min-h-screen justify-center">
        <p className=" animate-spin text-3xl  text-blue-600 ">
          <ImSpinner11 />
        </p>
      </div>
    );

  if (error) return `Error: ${(error as Error).message}`;

  return (
    <div className="flex flex-col  gap-2 bg-gray-100 min-h-screen">
      <Main_Navbar
        searchTerm={localityName}
        onSearchTermChange={(term) => setLocalityName(term)}
      />
      <main className="px-3 mx-auto flex justify-center items-center flex-col w-full ">
        <img
          className="h-screen flex justify-center items-center relative w-screen object-cover "
          src="https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <section className="absolute flex  justify-center items-center">
          <div className="flex justify-center items-center">
            <p></p>
          </div>

          {/* outer div */}
          <div className="bg-[#d5e1e1a5] border-2 border-white shadow-inner-all shadow-white  rounded-3xl h-[400px] w-[280px] md:h-[480px] md:w-[350px] lg:h-[550px] lg:w-[450px]  2xl:h-[620px] 2xl:w-[520px]">
            {/* Time  */}
            <div className="flex items-start">
              <div className="flex px-3 items-center space-x-2 pt-3">
                <ImLocation2 className="text-sm md:text-xl lg:text-[22px] 2xl:text-2xl text-red-600" />
                <p className="text-white md:text-sm lg:text-[16.5px]  font-bold text-[11px] 2xl:text-lg">
                  {localityName.toUpperCase()}
                </p>
              </div>
              <div className="ml-auto pr-2">
                <DateTimeDisplay />
              </div>
            </div>

            {/* Temperature & Humidity */}
            <div className="flex flex-col border-b-2 mx-10 pb-2 md:pb-[18px] 2xl:pb-5 border-[#e5e6e6a9] space-y-2 lg:space-y-5 justify-center items-center">
              <p className="text-white font-bold text-lg md:text-2xl lg:text-[28px]  2xl:text-5xl">
                Temperature
              </p>
              <div className="flex items-center space-x-3 ">
                <FaTemperatureHalf className="text-blue-500 text-3xl md:text-4xl lg:text-[45px]  2xl:text-7xl" />
                <p className=" text-[#faf604] text-3xl lg:text-[45px] md:text-4xl 2xl:text-7xl">
                  {intTemperature}°C
                </p>
              </div>

              <div className="flex items-center space-x-1">
                <WiHumidity className="text-lg md:text-xl lg:text-[22px] 2xl:text-4xl text-blue-500" />
                <p className="font-bold text-xs md:text-sm lg:text-[15px] 2xl:text-xl text-white">
                  Humidity
                </p>
                <p className="text-[#faf604] text-xs  md:text-sm lg:text-[15px]  2xl:text-xl font-bold">
                  {intHumidity}
                  <span className="text-[10px] md:text-[13px]  2xl:text-sm">
                    %
                  </span>
                </p>
              </div>
            </div>

            {/* Rain details */}
            <div className="flex  mx-10 py-2 md:py-[14px]  lg:py-[19px]  2xl:py-5 border-b-2 border-[#e5e6e6a9]">
              <div className="flex w-1/2 flex-col py-5 items-center  border-r-2 border-[#e5e6e6a9]">
                <p className="text-xs md:text-[17px] lg:text-lg 2xl:text-2xl font-bold text-white">
                  Rain Accu.
                </p>
                <div className="flex items-center space-x-2">
                  <IoRainy className="text-sm md:text-lg lg:text-xl 2xl:text-3xl text-blue-500" />
                  <p className="text-[#faf604] text-sm md:text-lg lg:text-xl 2xl:text-3xl font-bold">
                    {intRainAcc}{" "}
                    <span className="text-[10px] md:text-[13px]  2xl:text-lg">
                      mm
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex w-1/2 items-center py-5 flex-col ml-auto">
                <p className="text-xs md:text-[17px] lg:text-lg 2xl:text-2xl font-bold text-white">
                  Rain intensity
                </p>
                <div className="flex items-center space-x-2">
                  <GiDroplets className="text-sm md:text-lg lg:text-xl 2xl:text-3xl text-blue-500" />
                  <p className="text-[#faf604] text-sm md:text-lg lg:text-xl  2xl:text-2xl font-bold">
                    {intRainInt}{" "}
                    <span className="text-[10px] md:text-[13px] 2xl:text-lg">
                      mm/h
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Wind details */}
            <div className="flex  mx-8 py-2 md:py-[14px] lg:py-[19px] 2xl:py-5  border-[#e5e6e6a9]">
              <div className="flex w-1/2  flex-col py-5 items-center  border-r-2 border-[#e5e6e6a9]">
                <p className="text-xs md:text-[17px] lg:text-lg 2xl:text-2xl font-bold text-white">
                  Wind Speed
                </p>
                <div className="flex items-center space-x-2">
                  <FaWind className="text-sm md:text-lg lg:text-xl 2xl:text-3xl text-blue-500" />
                  <p className="text-[#faf604] text-sm md:text-lg lg:text-xl 2xl:text-2xl font-bold">
                    {intWindSpeed}{" "}
                    <span className="text-[10px] md:text-[13px] 2xl:text-lg">
                      Km/h
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex w-1/2 items-center  py-5 flex-col ml-auto">
                <p className="text-xs md:text-[17px] lg:text-lg 2xl:text-2xl font-bold text-white">
                  Wind Direction
                </p>
                <div className="flex items-center  space-x-2">
                  <ImCompass2 className="text-sm md:text-lg lg:text-xl  2xl:text-3xl text-blue-500" />

                  <p className="text-[#faf604] text-sm md:text-lg lg:text-xl  2xl:text-2xl font-bold">
                    {intWindDir} °
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPageContent />
    </Suspense>
  );
}
