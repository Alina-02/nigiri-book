"use client";
import React, { useEffect } from "react";
import { Icons } from "@/components/icons/Icons";
import Title from "@/components/basic/Title";
import Text from "@/components/basic/Text";

interface Props {
  error: Error & { digest?: string };
}

const Error = (props: Props) => {
  const { error } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      id="main-container"
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-8 sm:p-20"
    >
      <Icons.main />
      <div className="text-center m-16 w-[640px] grid gap-2">
        <Title>Sorry, we had an error :(</Title>
        <Text>{`${(<b>Error message:</b>)} ${error.message}`}</Text>
      </div>
    </div>
  );
};

export default Error;
