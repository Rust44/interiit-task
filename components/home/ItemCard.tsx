import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React from "react";

type Item = {
  item_id: string;
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
  item: Item;
};

const ProductCard = ({ item }: CardProps) => {
  return (
    <Card className="w-full max-w-sm">
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
      <CardFooter>
        <div className="text-xs text-gray-500">
          Item ID: {item.item_id}
          <br />
          Godown ID: {item.godown_id}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
