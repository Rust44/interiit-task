import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

type CardProps = {
  items: Item[];
};

const ProductCard = ({ items }: CardProps) => {
  return (
    <ScrollArea className="h-custom w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {items.map((item) => (
          <Card key={item._id} className="w-full h-full m-auto max-w-[380px]">
            <CardHeader>
              <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
              <Badge
                variant={
                  item.status === "out_of_stock" ? "destructive" : "default"
                }
              >
                {item.status === "out_of_stock" ? "Out of Stock" : "In Stock"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative mb-4">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  sizes="200px"
                  className="object-cover rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Brand:</div>
                <div>{item.brand}</div>
                <div>Category:</div>
                <div>{item.category}</div>
                <div>Quantity:</div>
                <div>{item.quantity}</div>
                <div>Price:</div>
                <div>${item.price.toFixed(2)}</div>
                {Object.entries(item.attributes).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <div className="capitalize">{key}:</div>
                    <div>{value}</div>
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProductCard;
