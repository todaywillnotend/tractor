import React from "react";
import cn from "classnames";

import "./Title.scss";

interface ITitle {
  text: string;
  align?: "left" | "right" | "center";
}

export const Title: React.FC<ITitle> = ({ text, align = "left" }) => {
  return <h2 className={cn("title", { [`title_${align}`]: align })}>{text}</h2>;
};
