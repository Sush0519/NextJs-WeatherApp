`use client`;

import { cn } from "@/app/utils/cn";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import WeatherReport from "../MainPage/WeatherReport.json";
type Props = {
  onSearchTermChange: (term: string, id: string) => void;
  localityId: string;
  localityName: string;
};

interface Locality {
  localityName: string;
  id: string;
}

export default function SearchBox({
  onSearchTermChange,
  localityId,
  localityName,
}: Props) {
  const [term, setTerm] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    setTerm(localityName);
    setId(localityId);
  }, [localityId, localityName]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value.toLowerCase();
    setTerm(newTerm);

    const matchingLocality = WeatherReport.document.page.flatMap((page) =>
      Object.entries(page.row)
        .map(([key, value]) => ({
          localityName: value.column[1]?.text?.text?.trim().toLowerCase(),
          id: value.column[2]?.text?.text || key,
        }))
        .find(({ localityName }) => localityName === newTerm)
    );
    setId(matchingLocality?.id || "");
    onSearchTermChange(newTerm, matchingLocality?.id || "");
  };

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (term && id) {
      console.log("Performing search with Locality ID:", id);
      onSearchTermChange(term, id);
    } else {
      console.log("Invalid search input.");
    }
  };

  const handleSuggestionClick = (localityName: string, id: string) => {
    setTerm(localityName);
    setId(id);
  };

  const suggestions: Locality[] = WeatherReport.document.page.flatMap((page) =>
    Object.entries(page.row)
      .map(([key, value]) => ({
        localityName: value.column[1]?.text?.text?.trim().toLowerCase(),
        id: value.column[2]?.text?.text || key,
      }))
      .filter(
        ({ localityName }) =>
          localityName &&
          localityName.startsWith(term) &&
          localityName !== term &&
          localityName !== "localityname"
      )
  );

  return (
    <form
      className={cn(
        "flex flex-col   relative items-center justify-center h-10 "
      )}
      onSubmit={onSearch}
    >
      <div className="flex">
        <input
          type="text"
          value={term}
          onChange={onChange}
          placeholder="Search"
          className="px-4 py-2 w-[230px] border bg-slate-50 border-gray-300 rounded-l-md focus:outline-none  h-full"
        />
        <button
          type="submit"
          className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none  hover:bg-blue-600 h-full"
        >
          <IoSearch />
        </button>
      </div>

      {term && suggestions.length > 0 && (
        <div className="bg-white px-2 w-[277px] -mt-[20px] rounded-b-md rounded-sm  absolute z-50  top-14 max-h-[150px] overflow-y-auto border-l-[1px] border-b-[1px] border-r-[1px] border-gray-300">
          {suggestions.map(({ localityName, id }, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(localityName, id)}
              className="cursor-pointer text-black text-start my-1 mx-0"
            >
              {localityName}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
