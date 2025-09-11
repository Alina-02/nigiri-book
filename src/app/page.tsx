import MinimizeShelf, { ShelfType } from "@/components/MinimizeShelf";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 mx-16 my-12">
      <MinimizeShelf shelfTitle="Reading" shelfType={ShelfType.Reading} />
      <MinimizeShelf shelfTitle="Pending" shelfType={ShelfType.Pending} />
      <MinimizeShelf shelfTitle="Favourite" shelfType={ShelfType.Favourite} />
      <MinimizeShelf shelfTitle="Read" shelfType={ShelfType.Finished} />
    </div>
  );
}
