"use client";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingButton from "@/components/loading-button";
import { createNewItem } from "@/actions/itemAction";
import { itemSchema } from "@/lib/schema";
import { toast } from "sonner";

type Godown = {
  _id: string;
  name: string;
};

export default function CreateItem() {
  const [godowns, setGodowns] = useState<Godown[]>([]);

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      quantity: "",
      category: "",
      price: "",
      status: "in_stock",
      godown_id: "",
      brand: "",
      attributes: [{ key: "", value: "" }],
      image_url: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const onSubmit = async (data: z.infer<typeof itemSchema>) => {
    const res = await createNewItem(data);
    
    if (res === "success") {
      toast.success("Item created successfully");
    } else {
      toast.error(res);
    }
  };
  
  useEffect(() => {
    fetch("/api/getAllGodowns")
      .then((res) => res.json())
      .then((data) => setGodowns(data));
  }, []);

  return (
    <div className="flex items-center justify-center h-custom">
      <Card className="w-full max-w-2xl mx-auto border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-center uppercase">
            Create Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Item Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Quantity" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="in_stock">In Stock</SelectItem>
                        <SelectItem value="out_of_stock">
                          Out of Stock
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="godown_id"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a godown" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {godowns.map((godown) => (
                          <SelectItem key={godown._id} value={godown._id}>
                            {godown.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Brand Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex space-x-2 mt-2">
                    <FormField
                      control={form.control}
                      name={`attributes.${index}.key`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Key" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`attributes.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Value" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => append({ key: "", value: "" })}
                  className="mt-2"
                >
                  Add Attribute
                </Button>
              </div>

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                text="Create Item"
                isLoading={form.formState.isSubmitting}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
