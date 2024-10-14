"use client";
import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Warehouse } from "lucide-react";
import Link from "next/link";

type Item = {
  _id: string;
  name: string;
  id: number;
};

type groupGodownType = {
  _id: string;
  name: string;
  parent_godown: string | null;
  items?: Item[] | undefined;
  children: groupGodownType[];
};

type Godown = {
  _id: string;
  name: string;
  parent_godown: string | null;
  items?: Item[] | undefined;
};

const findAndAddGodown = (
  godown: Godown,
  newGroupedGodowns: groupGodownType[],
) => {
  for (let i = 0; i < newGroupedGodowns.length; i++) {
    if (godown.parent_godown === newGroupedGodowns[i]._id) {
      newGroupedGodowns[i].children?.push({
        _id: godown._id,
        name: godown.name,
        parent_godown: godown.parent_godown,
        items: godown.items,
        children: [],
      });
      return;
    } else if (newGroupedGodowns[i].children?.length > 0) {
      findAndAddGodown(godown, newGroupedGodowns[i].children);
    }
  }
};

const getGroupedGodown = (godowns: Godown[]) => {
  const newGroupedGodowns: groupGodownType[] = [];

  for (let i = 0; i < godowns.length; i++) {
    const godown = godowns[i];
    if (godown.parent_godown === null) {
      newGroupedGodowns.push({
        _id: godown._id,
        name: godown.name,
        parent_godown: godown.parent_godown,
        items: godown.items,
        children: [],
      });
    } else {
      findAndAddGodown(godown, newGroupedGodowns);
    }
  }

  return newGroupedGodowns;
};

export default function Sidebar() {
  const [godowns, setGodowns] = useState<Godown[]>([]);

  const [groupedGodowns, setGroupedGodowns] = useState<Godown[]>([]);
  
  const groupGodown = useCallback(() => {
      setGroupedGodowns(getGroupedGodown(godowns));
    }, [godowns]);

  const [selectedGodownId, setSelectedGodownId] = useState<string | null>(null);

  const onSelectGodown = (godown: Godown) => {
    setSelectedGodownId(godown._id);
  };
  
  console.log("godowns ", godowns);
  console.log("groupedGodowns ", groupedGodowns);

  useEffect(() => {
    groupGodown();
  }, [godowns, groupGodown]);

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
