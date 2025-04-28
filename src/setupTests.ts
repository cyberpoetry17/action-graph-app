import "@testing-library/jest-dom";

import { TextEncoder } from "util";

global.TextEncoder = TextEncoder;

// //for jest and charts
// class ResizeObserver {
//   observe() {}
//   unobserve() {}
//   disconnect() {}n
// }
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// (global as any).ResizeObserver = ResizeObserver;
