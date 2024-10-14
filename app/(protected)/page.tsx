"use client"
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Warehouse } from "lucide-react";

type Godown = {
  id: string;
  name: string;
  parent_godown: string | null;
};

export default function GodownSidebar() {
  const godowns: Godown[] = [
    {
      id: "d72518e97c3f4a68979153f2b8e9308e",
      name: "Torres, Rowland and Peters Warehouse",
      parent_godown: null,
    },
    {
      id: "a6565c19ccbb4bb8a2a04130a14988db",
      name: "Western Center House",
      parent_godown: "d72518e97c3f4a68979153f2b8e9308e",
    },
    {
      id: "4ce59062eadd4d4ca5e105f30a9f7256",
      name: "Sector 60",
      parent_godown: "a6565c19ccbb4bb8a2a04130a14988db",
    },
    {
      id: "e06d51d013ab47d791d90f0ea097cc66",
      name: "Sector 77",
      parent_godown: "a6565c19ccbb4bb8a2a04130a14988db",
    },
    {
      id: "7579aa5649484332ab86c0b52f2b3222",
      name: "Western Stockpile House",
      parent_godown: "d72518e97c3f4a68979153f2b8e9308e",
    },
    {
      id: "2d129e1979bc456380d878f8c47fe66b",
      name: "Sector 59",
      parent_godown: "7579aa5649484332ab86c0b52f2b3222",
    },
    {
      id: "01707d239a6b40f08d250d4530893437",
      name: "Sector 11",
      parent_godown: "7579aa5649484332ab86c0b52f2b3222",
    },
    {
      id: "8887264e574149158faa17eb28cc53db",
      name: "Sector 36",
      parent_godown: "7579aa5649484332ab86c0b52f2b3222",
    },
    {
      id: "c02f1afa1fc34084b0c455169d236853",
      name: "Northern Center House",
      parent_godown: "d72518e97c3f4a68979153f2b8e9308e",
    },
    {
      id: "bddc0aca02ac4798b152ecbf360220c7",
      name: "Sector 98",
      parent_godown: "c02f1afa1fc34084b0c455169d236853",
    },
    {
      id: "8d1805f606904aaebc2bbcee8f78ce09",
      name: "Sector 75",
      parent_godown: "c02f1afa1fc34084b0c455169d236853",
    },
    {
      id: "025cc28ebb804967b56b946a41942f86",
      name: "Walls, Leblanc and Williams Warehouse",
      parent_godown: null,
    },
  ];

  const [selectedGodownId, setSelectedGodownId] = React.useState<string | null>(
    null,
  );

  const onSelectGodown = (godown: Godown) => {
    setSelectedGodownId(godown.id);
  };

  return (
    <div className="w-64 bg-background border-r h-screen">
      <div className="p-4 font-semibold text-lg border-b">Godowns</div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-2">
          {godowns.map((godown) => (
            <button
              key={godown.id}
              className={`flex items-center w-full py-2 px-3 text-left hover:bg-accent rounded-md transition-colors ${
                selectedGodownId === godown.id ? "bg-accent" : ""
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
