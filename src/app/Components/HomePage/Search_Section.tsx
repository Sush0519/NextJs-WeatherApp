"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import WeatherReport from "../MainPage/WeatherReport.json";

type SearchSelectionProps = {
  localityName: string;
  localityId: string | null;
  onLocalitySelect: (name: string, id: string) => void;
};

interface Locality {
  localityName: string;
  localityid: string;
}

export default function Search_Section({
  localityName,
  localityId,
  onLocalitySelect,
}: SearchSelectionProps) {
  const [searchTerm, setSearchTerm] = useState<string>(localityName || "");
  const [localityIdState, setLocalityIdState] = useState<string | null>(
    localityId
  );
  const [suggestions, setSuggestions] = useState<Locality[]>([]);

  useEffect(() => {
    setSearchTerm(localityName);
    setLocalityIdState(localityId);
  }, [localityName, localityId]);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value.toLowerCase();
    setSearchTerm(newTerm);

    if (newTerm.trim()) {
      const newSuggestions = WeatherReport.document.page.flatMap((page) =>
        Object.entries(page.row)
          .map(([key, value]) => {
            const localityColumn1 = value.column[1]?.text;
            const localityColumn2 = value.column[2]?.text;

            const localityName =
              typeof localityColumn1 === "object"
                ? localityColumn1.text?.trim().toLowerCase()
                : "";
            const localityId =
              typeof localityColumn2 === "object" ? localityColumn2.text : key;

            return {
              localityName,
              localityid: localityId,
            };
          })
          .filter(
            ({ localityName }) =>
              localityName &&
              localityName.startsWith(newTerm) &&
              localityName !== newTerm &&
              localityName !== "localityname"
          )
      );

      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className=" w-full absolute top-0 h-screen   flex flex-col justify-start items-center">
      <img
        className=" sm:w-44 md:w-52 lg:w-64 xl:w-72 w-32 mt-16 lg:mt-20"
        src="https://lh3.googleusercontent.com/d_S5gxu_S1P6NR1gXeMthZeBzkrQMHdI5uvXrpn3nfJuXpCjlqhLQKH_hbOxTHxFhp5WugVOEcl4WDrv9rmKBDOMExhKU5KmmLFQVg"
        alt=""
      />

      <div className="">
        <div
          className={cn(
            "flex relative justify-center  items-center h-8 md:h-9 xl:h-11"
          )}
        >
          <button
            type="button"
            className="flex w-9 h-8 md:h-9 border-t-[1px] border-l-[1px] border-b-[1px] border-gray-200  xl:h-11 rounded-l-full bg-white justify-center items-center"
          >
            <IoSearch className="  text-gray-400 text-sm lg:text-lg" />
          </button>

          <input
            className=" px-3 text-xs lg:px-4  w-[300px]  sm:w-[400px] md:w-[460px] lg:w-[540px] xl:w-[590px] border-t-[1px] border-b-[1px] border-r-[1px] border-gray-200 rounded-r-full  focus:outline-none text-start  h-full"
            type="text"
            value={searchTerm}
            onChange={onChange}
          />

          {searchTerm && suggestions.length > 0 && (
            <div className="bg-white -mt-3 px-2 w-[350px] sm:w-[400px] md:w-[460px] lg:w-[540px] xl:w-[590px] rounded-b-md  absolute z-50 top-14 max-h-[150px] overflow-y-auto border-l-[1px] border-r-[1px] border-b-[1px] border-gray-200 shadow-md">
              {suggestions.map(({ localityName, localityid }, index) => (
                <Link
                  key={index}
                  href={`/Components/MainPage?localityName=${encodeURIComponent(
                    localityName
                  )}&locality_id=${encodeURIComponent(localityid)}`}
                  prefetch={true}
                >
                  <button className="cursor-pointer text-black text-start my-1 mx-0 block">
                    {localityName}
                  </button>
                </Link>
              ))}
            </div>
          )}
          <div className="flex absolute justify-center space-x-2 right-5 items-center">
            <img
              className="w-5 sm:w-6 lg:w-8 "
              src="https://lh3.googleusercontent.com/PZfvvpPrihOCoQmwPn-qkBNjHrcESxEKJNlmvbcI-OWSuquFEee-Mwls_KVFIvhpl6kxGcEdqZDKTP3qOp5GvSSyIAI6RUbG9ni82g"
              alt=""
            />

            <img
              className="w-3 sm:w-4 lg:w-6"
              src="https://lh3.googleusercontent.com/NFxLdaBDrLD43tZ017kWF3E3kvTos2rT5Pk3zejZEh6e2rB567Mbn0nQK9nd_C1DE3YnNbLgaD9J_897t5tU7o34lenEFL9xDGm-MKlJqMA_L4Ts6w"
              alt=""
            />
          </div>
        </div>

        <div className="flex me-auto font-light text-[10px] lg:text-sm pt-4 lg:pt-10 space-x-10 items-center justify-center">
          <span>Google Search</span>
          <span>I am Feeling Lucky</span>
        </div>
        <div className="flex justify-center items-center pt-5 lg:pt-9  space-x-3">
          <span className="text-black text-[10px] lg:text-sm font-light">
            Google offered in:
          </span>
          <a
            className="text-blue-800 text-[10px] lg:text-sm hover:underline"
            href=""
          >
            हिन्दी
          </a>
          <a
            className="text-blue-800 text-[10px] lg:text-sm hover:underline"
            href=""
          >
            বাংলা
          </a>
          <a
            className="text-blue-800 text-[10px] lg:text-sm hover:underline"
            href=""
          >
            తెలుగు
          </a>
          <a
            className="text-blue-800 text-[10px] lg:text-sm hover:underline"
            href=""
          >
            मराठी
          </a>
        </div>
      </div>
    </div>
  );
}
