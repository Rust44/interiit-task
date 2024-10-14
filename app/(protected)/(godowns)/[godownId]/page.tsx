import ItemCard from "@/components/home/ItemCard";
import { getItemByGodownId } from "@/actions/itemAction";

export default async function GodownItems({
  params,
}: {
  params: { godownId: string };
}) {
  const items = await getItemByGodownId(params.godownId);
  
  console.log("items ", items);

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.item_id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}