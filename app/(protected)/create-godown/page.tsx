"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingButton from "@/components/loading-button";
import { createNewGodown } from "@/actions/godownActions";
import { godownSchema } from "@/lib/schema";
import { toast } from "sonner";

type Godown = {
  _id: string;
  name: string;
};

export default function CreateGodown() {
  const [godowns, setGodowns] = useState<Godown[]>([]);

  const form = useForm<z.infer<typeof godownSchema>>({
    resolver: zodResolver(godownSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof godownSchema>) => {
    const response = await createNewGodown(data.name, data.parentGodown);
    
    if (response !== "success") {
      toast.error(response);
    } else {
      toast.success("Godown created successfully");
      form.reset();
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
            Create Godown
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
                    <FormLabel>Godown Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Godown Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentGodown"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Godown</FormLabel>
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
