import { GatsbyBrowser } from "gatsby";

import "./src/styles/global.scss";

import { commonElementWrapper } from "./src/context/CommonContext";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  return commonElementWrapper(element);
};
