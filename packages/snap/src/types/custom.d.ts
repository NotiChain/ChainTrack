/* eslint-disable*/

import { MetaMaskInpageProvider } from '@metamask/providers';
/*
 * Window type extension to support ethereum
 */


declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider & {
      setProvider?: (provider: MetaMaskInpageProvider) => void;
      detected?: MetaMaskInpageProvider[];
      providers?: MetaMaskInpageProvider[];
    };
  }

  type SnapPanel =
    ({
      value: string;
      type: NodeType.Copyable;
    } | {
      type: NodeType.Divider;
    } | {
      value: string;
      type: NodeType.Heading;
    } | import("./nodes").Panel | {
      type: NodeType.Spinner;
    } | {
      value: string;
      type: NodeType.Text;
    })[];
}
