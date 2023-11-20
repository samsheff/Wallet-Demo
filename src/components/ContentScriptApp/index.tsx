import { createRoot } from "react-dom/client";
import ContentApp from "@root/src/components/ContentScriptApp/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { ChakraProvider } from "@chakra-ui/react";

refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "lambda-wallet-root";

document.body.append(root);
/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

createRoot(root).render(
  <ChakraProvider>
    <ContentApp />
  </ChakraProvider>
);
