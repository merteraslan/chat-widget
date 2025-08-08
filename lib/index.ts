export { ChatWidget } from "./ChatWidget/ChatWidget";
export type {
    ChatWidgetProps,
    ChatMessage
} from "./ChatWidget/ChatWidget";
export type {
    InteractiveContent,
    ArticleItem,
    FormField,
    FormData,
    CardItem,
    CardData,
    CannedResponseItem,
    CannedResponseData
} from "./ChatWidget/InteractiveMessages";

// Lightweight vanilla helper to mount the React widget without a framework
// This keeps React as a peer dependency and works in UMD/ESM builds.
export function mountChatWidget(
    target: Element | string,
    props: import("./ChatWidget/ChatWidget").ChatWidgetProps
): { unmount: () => void } {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) {
        throw new Error("mountChatWidget: target element not found");
    }

    // Prefer the official client API. In UMD builds, globals mapping points to ReactDOM.
    // We import the type to keep typings accurate without bundling.
    let createRootFn: (container: Element | DocumentFragment) => import("react-dom/client").Root;
    try {
        // In UMD, ReactDOM is a global and includes createRoot
        const g = globalThis as { ReactDOM?: { createRoot?: typeof import("react-dom/client").createRoot } };
        if (g.ReactDOM?.createRoot) {
            createRootFn = g.ReactDOM.createRoot;
        } else {
            // In ESM/bundlers, import from react-dom/client via require (handled by bundlers)
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const mod = require("react-dom/client") as typeof import("react-dom/client");
            createRootFn = mod.createRoot;
        }
    } catch {
        throw new Error("mountChatWidget: unable to resolve react-dom/client. Ensure react-dom@18+ is installed or provide window.ReactDOM.");
    }

    const root = createRootFn(el);

    // Render without depending on jsx-runtime globals
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require("react") as typeof import("react");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { ChatWidget } = require("./ChatWidget/ChatWidget") as typeof import("./ChatWidget/ChatWidget");
    root.render(React.createElement(ChatWidget, props));

    return {
        unmount: () => root.unmount(),
    };
}
