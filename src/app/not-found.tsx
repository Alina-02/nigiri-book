"use client";
import React from "react";
import { Icons } from "@/components/icons/Icons";
import Title from "@/components/basic/Title";

const NotFound = () => {
  return (
    <div
      id="main-container"
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-8 sm:p-20"
    >
      <Icons.main />
      <div className="text-center m-16 w-[640px] grid gap-2">
        <Title>Sorry, we lost this page :(</Title>
      </div>
    </div>
  );
};

export default NotFound;
