import Title from "@/components/basic/Title";
import Text from "@/components/basic/Text";

import { Icons } from "@/components/Icons";

export default function Home() {
  return (
    <div
      id="main-container"
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-8 sm:p-20"
    >
      <Icons.main />
      <div className="text-center m-16 w-[640px] grid gap-2">
        <Title>Sorry, we had an error :(</Title>
        <Text>
          Error message: mensaje de error porque debe haber un mensaje
          probablemente incomprensible respecto a lo que ha ocurrido.
        </Text>
      </div>
    </div>
  );
}
