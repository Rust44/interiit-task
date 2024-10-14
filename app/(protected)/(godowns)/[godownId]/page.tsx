"use client";
import ItemCard from "@/components/home/ItemCard";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import { Inbox } from "lucide-react";
import { toast } from "sonner";

type Item = {
  _id: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
  status: string;
  godown_id: string;
  brand: string;
  attributes: Record<string, string | number | boolean>;
  image_url: string;
};

export default function GodownItems({
  params,
}: {
  params: { godownId: string };
}) {
  const [items, setItems] = useState<Item[]>([]);

  const getItems = useCallback(async () => {
    const res = await fetch(`/api/items/${params.godownId}`);

    if (res.ok) {
      const data = await res.json();
      setItems(data);
    } else {
      console.error("Failed to fetch items");
    }
  }, [params.godownId]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <>
      <div className="container max-w-screen-2xl m-auto">
        {items.length > 0 ? (
          <ItemCard items={items} />
        ) : (
          <div className="flex items-center justify-center h-custom w-full">
            <Card className="flex items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Inbox className="w-12 h-12 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold text-center mb-2">
                  No Item&apos;s in this Godown
                </h2>
                <p className="text-muted-foreground text-center">
                  Select a different godown from the sidebar.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
