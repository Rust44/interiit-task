"use client";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Warehouse } from "lucide-react";

type Godown = {
  _id: string;
  name: string;
  parent_godown: string | null;
};

export default function Sidebar(width?: string | number) {
  const [godowns, setGodowns] = useState<Godown[]>([]);

  const [selectedGodownId, setSelectedGodownId] = useState<string | null>(null);

  const onSelectGodown = (godown: Godown) => {
    setSelectedGodownId(godown._id);
  };

  const sidebarStyle = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : "256px",
  };

  useEffect(() => {
    fetch("/api/getAllGodowns")
      .then((res) => res.json())
      .then((data) => {
        setGodowns(data);
      });
  }, []);

  return (
    <div className="bg-background border-r h-custom duration-200 transition-all max-w-[400px] min-w-[200px]" style={sidebarStyle}>
      <ScrollArea className="h-custom">
        <div className="p-2">
          {godowns.map((godown) => (
            <button
              key={godown._id}
              className={`flex items-center w-full py-2 px-3 text-left hover:bg-accent rounded-md transition-colors ${
                selectedGodownId === godown._id ? "bg-accent" : ""
              }`}
              onClick={() => onSelectGodown(godown)}
            >
              <Warehouse className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{godown.name}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
