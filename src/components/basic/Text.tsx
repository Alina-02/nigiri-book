import React, { ReactNode } from "react";

type Props = {
  children: string;
};

const Text = ({ children }: Props) => {
  return <div className="font-inter">{children} </div>;
};

export default Text;
