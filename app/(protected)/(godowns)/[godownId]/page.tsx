"use client";
import ItemCard from "@/components/home/ItemCard";
import { useState, useEffect, useCallback } from "react";

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
        <ItemCard items={items} />
      </div>
    </>
  );
}
