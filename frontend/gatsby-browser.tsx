import React from "react";
import { GatsbyBrowser } from "gatsby";
import ym, { YMInitializer } from "react-yandex-metrika";

import "./src/styles/global.scss";

import { commonElementWrapper } from "./src/context/CommonContext";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  return commonElementWrapper(element);
};
