import React from "react";
import cn from "classnames";

import * as styles from "./Title.module.scss";

interface ITitle {
  text: string;
  align?: "left" | "right" | "center";
}

export const Title: React.FC<ITitle> = ({ text, align = "left" }) => {
  return (
    <h2 className={cn(styles.title, { [styles[align]]: align })}>{text}</h2>
  );
};
