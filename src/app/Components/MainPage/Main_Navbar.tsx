`use client`;

import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import React from "react";
import { useState } from "react";
import SearchBox from "./SearchBox";
import { useRouter } from "next/navigation";

export default function Main_Navbar({
  searchTerm,
  onSearchTermChange,
}: {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}) {
  const [localityId, setLocalityId] = useState<string>("");
  const router = useRouter();

  const handleSearchTermChange = (localityName: string, localityId: string) => {
    if (!localityName || !localityId) {
      console.log(
        "Invalid or empty localityName or localityId. Navigation aborted."
      );
      return;
    }

    onSearchTermChange(localityName);
    setLocalityId(localityId);

    router.push(
      `MainPage?locality_id=${encodeURIComponent(
        localityId
      )}&localityName=${encodeURIComponent(localityName)}`
    );
  };

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <p className="flex items-center justify-center gap-2 ">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </p>

          <section className="flex gap-2 items-center">
            <MdOutlineLocationOn className="text-3xl text-red-600" />
            <p className="text-slate-900/80 text-sm">
              {searchTerm.toUpperCase()}{" "}
            </p>

            <div className="hidden md:flex">
              <SearchBox
                onSearchTermChange={handleSearchTermChange}
                localityId={localityId}
                localityName={searchTerm}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="">
          <SearchBox
            onSearchTermChange={handleSearchTermChange}
            localityId={localityId}
            localityName={searchTerm}
          />
        </div>
      </section>
    </>
  );
}
