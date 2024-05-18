import React from "react";

import "./Title.scss";

interface ITitle {
  text: string;
}

export const Title: React.FC<ITitle> = ({ text }) => {
  return <h2 className="title">{text}</h2>;
};
