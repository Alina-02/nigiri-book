import React from "react";

type Props = {
  children: string;
};

const Title = ({ children }: Props) => {
  return <h1 className="font-bold text-3xl font-inter">{children}</h1>;
};

export default Title;
