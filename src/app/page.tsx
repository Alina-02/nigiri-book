import { Icons } from "@/components/Icons";
import Image from "next/image";

export default function Home() {
  return (
    <div
      id="main-container"
      className="flex items-center justify-center min-h-screen p-8 pb-8 sm:p-20"
    >
      <div className="shadow-lg  rounded-full bg-primary w-[420px] h-[420px] flex items-center justify-center">
        <Icons.main />
      </div>
    </div>
  );
}
