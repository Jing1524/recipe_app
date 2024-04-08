"use client";

import { Input } from "@/components/ui/input";
import { useSearchQuery } from "@/context/useSearchQuery";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, {useState} from "react";

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [localSearchQuery, setLocalSearchQuery] = useState<string>("")

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchQuery(localSearchQuery);
    }
  };

  return (
    <header className="flex flex-col items-start w-full gap-4">
      <div className="flex items-center gap-20 w-full">
        <h1 className="text-lg font-bold cursor-pointer">
          <a href="/">Cooking</a>
        
          </h1>
        <div className="relative w-full">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="what would you like to cook?"
            className="pl-8 max-w-lg"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <hr className="w-full border-1 border-slate-500" />
    </header>
  );
};

export default Header;
