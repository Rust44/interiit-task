"use client";
import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Warehouse, Kanban } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const GroupGodowns = ({
  groupedGodowns,
}: {
  groupedGodowns: groupGodownType[];
}) => {
  
  return (
    <>
      <Accordion type="multiple" className="text-xs ">
        {groupedGodowns.map((godown: groupGodownType) => (
          <>
            <AccordionItem value={godown._id} className="border-b-0">
              <AccordionTrigger className="py-2">
                <Warehouse className="h-3 w-3 mr-2 flex-shrink-0" />
                <Link href={`/${godown._id}`} aria-disabled={godown.items?.length ? true : false} className="truncate w-full text-left">{godown.name}</Link>
              </AccordionTrigger>
              <AccordionContent className="pl-4">
                {godown.children.length > 0 && (
                  <GroupGodowns groupedGodowns={godown.children} />
                )}
                {godown.items &&
                  godown.items.map((item) => (
                    <div key={item._id} className="flex items-center">
                      <Kanban className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="truncate w-full text-left">
                        {item.name}
                      </span>
                    </div>
                  ))}
              </AccordionContent>
            </AccordionItem>
          </>
        ))}
      </Accordion>
    </>
  );
};

export default function Sidebar() {
  const [godowns, setGodowns] = useState<Godown[]>([]);

  const [groupedGodowns, setGroupedGodowns] = useState<groupGodownType[]>([]);

  const groupGodown = useCallback(() => {
    setGroupedGodowns(getGroupedGodown(godowns));
  }, [godowns]);

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
          <GroupGodowns groupedGodowns={groupedGodowns} />
        </div>
      </ScrollArea>
    </div>
  );
}
