"use client";
import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Warehouse } from "lucide-react";
import Link from "next/link";

type groupGodownType = {
  _id: string;
  name: string;
  parent_godown: string | null;
  children?: groupGodownType[];
};

type Godown = {
  _id: string;
  name: string;
  parent_godown: string | null;
};

export default function Sidebar() {
  const [godowns, setGodowns] = useState<Godown[]>([]);

  const [groupedGodowns, setGroupedGodowns] = useState<Godown[]>([]);

  const groupGodown = useCallback(() => {
    const groupGodowns: groupGodownType[] = [];

    godowns.forEach((godown) => {
      if (godown.parent_godown === null) {
        groupGodowns.push(godown);
      }
    });

    godowns.forEach((godown) => {
      if (godown.parent_godown !== null) {
        const parentGodown = groupGodowns.find(
          (g) => g._id === godown.parent_godown,
        );
        if (parentGodown) {
          if (!parentGodown.children) {
            parentGodown.children = [];
          }
          parentGodown.children.push(godown);
        }
      }
    });

    console.log("grouped godown ", groupGodowns);

    setGroupedGodowns(groupedGodowns);
  }, [godowns]);

  useEffect(() => {
    groupGodown();
  }, [godowns, groupGodown]);

  const [selectedGodownId, setSelectedGodownId] = useState<string | null>(null);

  const onSelectGodown = (godown: Godown) => {
    setSelectedGodownId(godown._id);
  };

  useEffect(() => {
    try {
      fetch("/api/getAllGodowns")
        .then((res) => res.json())
        .then((data) => {
          setGodowns(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="bg-background border-r h-custom">
      <ScrollArea className="h-custom">
        <div className="p-2">
          {godowns.map((godown) => (
            <Link
              href={`/${godown._id}`}
              key={godown._id}
              className={`flex items-center w-full py-2 px-3 text-left hover:bg-accent rounded-md transition-colors ${
                selectedGodownId === godown._id ? "bg-accent" : ""
              }`}
              onClick={() => onSelectGodown(godown)}
            >
              <Warehouse className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{godown.name}</span>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
