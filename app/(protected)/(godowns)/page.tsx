import { Card, CardContent } from "@/components/ui/card";
import { Inbox } from "lucide-react";

export default function GodownSidebar() {
  return (
    <div className="flex items-center justify-center h-custom w-full">
      <Card className="flex items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Inbox className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold text-center mb-2">
            No Godown Selected
          </h2>
          <p className="text-muted-foreground text-center">
            Select a godown from the sidebar to view its details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
