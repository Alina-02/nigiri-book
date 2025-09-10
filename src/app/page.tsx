import MinimizeShelf from "@/components/MinimizeShelf";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 mx-16 my-12">
      <MinimizeShelf shelfTitle="Reading" />
      <MinimizeShelf shelfTitle="Pending" />
      <MinimizeShelf shelfTitle="Favourite" />
    </div>
  );
}
