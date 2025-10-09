import { useEffect, useRef, useState } from 'react';

const DEFAULT_CHATKIT_SCRIPT = 'https://cdn.openai.com/chatkit/widget.js';

type ChatKitRenderMethod = 'mount' | 'render';

type ChatKitMountHandle = {
  destroy?: () => void;
} | void;

type ChatKitModule = {
  mount?: (options: Record<string, unknown>) => ChatKitMountHandle | Promise<ChatKitMountHandle>;
  render?: (options: Record<string, unknown>) => ChatKitMountHandle | Promise<ChatKitMountHandle>;
};

declare global {
  interface Window {
    ChatKit?: ChatKitModule;
  }
}

const scriptPromises = new Map<string, Promise<void>>();

function isDestroyable(result: unknown): result is { destroy?: () => void } {
  return (
    typeof result === 'object' &&
    result !== null &&
    'destroy' in result &&
    typeof (result as { destroy?: unknown }).destroy === 'function'
  );
}

function shallowEqualRecords(
  a: Record<string, unknown>,
  b: Record<string, unknown>
): boolean {
  if (a === b) {
    return true;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    if (!Object.is(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

function loadScript(src: string) {
  let existingPromise = scriptPromises.get(src);
  if (existingPromise) {
    return existingPromise;
  }

  const promise = new Promise<void>((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('ChatKit widgets require a browser environment.'));
      return;
    }

    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;

    if (existing?.dataset.chatWidgetLoaded === 'true') {
      resolve();
      return;
    }

    if (existing && existing.dataset.chatWidgetLoaded !== 'true') {
      existing.remove();
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.crossOrigin = 'anonymous';

    const cleanup = () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };

    const handleLoad = () => {
      script.dataset.chatWidgetLoaded = 'true';
      cleanup();
      resolve();
    };

    const handleError = () => {
      cleanup();
      script.remove();
      reject(new Error(`Failed to load ChatKit script from ${src}`));
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    document.head.append(script);
  });

  promise.catch(() => {
    scriptPromises.delete(src);
  });

  scriptPromises.set(src, promise);
  return promise;
}

async function resolveChatKit(
  method: ChatKitRenderMethod,
  scriptUrl: string | undefined,
  resolver?: () => Promise<ChatKitModule | undefined> | ChatKitModule | undefined
): Promise<ChatKitModule> {
  if (typeof window === 'undefined') {
    throw new Error('ChatKit widgets require a browser environment.');
  }

  if (typeof resolver === 'function') {
    const resolved = await resolver();
    if (resolved && typeof resolved === 'object' && resolved !== null && resolved[method]) {
      return resolved;
    }
  }

  const globalModule = window.ChatKit;
  if (globalModule && globalModule[method]) {
    return globalModule;
  }

  if (!scriptUrl) {
    throw new Error('No ChatKit instance available. Provide a scriptUrl or resolver.');
  }

  await loadScript(scriptUrl);

  if (!window.ChatKit || !window.ChatKit[method]) {
    throw new Error(`ChatKit.${method} is not available after loading ${scriptUrl}.`);
  }

  return window.ChatKit;
}

export interface ChatKitWidgetConfig {
  /**
   * Options forwarded to the ChatKit mount/render call. The target element is injected automatically.
   */
  options: Record<string, unknown>;
  /**
   * Choose between ChatKit's `mount` (default) and `render` helpers.
   */
  renderMethod?: ChatKitRenderMethod;
  /**
   * CDN script used when ChatKit is not already present on the window. Provide your own to self-host or pin versions.
   */
  scriptUrl?: string;
  /**
   * Optional resolver that returns a ChatKit module (useful when bundling `@openai/chatkit` manually).
   */
  resolver?: () => Promise<ChatKitModule | undefined> | ChatKitModule | undefined;
  /**
   * Message displayed while the widget initialises.
   */
  loadingLabel?: string;
  /**
   * Message displayed when ChatKit fails to load.
   */
  errorLabel?: string;
  /**
   * Invoked once ChatKit resolves. Receives the raw handle returned by ChatKit.
   */
  onReady?: (handle: ChatKitMountHandle) => void;
  /**
   * Invoked when ChatKit fails to initialise.
   */
  onError?: (error: Error) => void;
  /**
   * Additional class applied to the ChatKit container.
   */
  containerClassName?: string;
}

export function ChatKitWidget({
  options,
  renderMethod = 'mount',
  scriptUrl = DEFAULT_CHATKIT_SCRIPT,
  resolver,
  loadingLabel = 'Loading assistant…',
  errorLabel = "We couldn't load the assistant right now.",
  onReady,
  onError,
  containerClassName,
}: ChatKitWidgetConfig) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stableOptions, setStableOptions] = useState<Record<string, unknown>>(options);

  useEffect(() => {
    setStableOptions((current) =>
      shallowEqualRecords(current, options) ? current : options
    );
  }, [options]);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    setStatus('loading');
    setErrorDetail(null);

    async function mount() {
      try {
        const chatkit = await resolveChatKit(renderMethod, scriptUrl, resolver);
        if (cancelled) {
          return;
        }

        const method = chatkit[renderMethod];
        if (!method) {
          throw new Error(`ChatKit.${renderMethod} is not available.`);
        }

        if (!containerRef.current) {
          throw new Error('ChatKit container element is unavailable.');
        }

        const result = await method({ ...stableOptions, element: containerRef.current });
        const destroy = isDestroyable(result) ? result.destroy?.bind(result) : undefined;

        if (cancelled) {
          if (destroy) destroy();
          return;
        }

        cleanup = destroy;
        setStatus('ready');
        onReady?.(result);
      } catch (error) {
        if (cancelled) return;
        const err = error instanceof Error ? error : new Error(String(error));
        setStatus('error');
        setErrorDetail(err.message);
        onError?.(err);
      }
    }

    void mount();

    return () => {
      cancelled = true;
      if (cleanup) {
        cleanup();
      }
    };
  }, [stableOptions, renderMethod, resolver, scriptUrl, onReady, onError]);

  const wrapperClassName = ['cw-chatkit', 'cw-chatkit-host', containerClassName].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName} data-status={status}>
      {status === 'loading' && (
        <div className="cw-chatkit-loading" role="status" aria-live="polite">
          {loadingLabel}
        </div>
      )}
      {status === 'error' && (
        <div className="cw-chatkit-error" role="alert">
          {errorLabel}
          {errorDetail && <div className="cw-chatkit-error-detail">{errorDetail}</div>}
        </div>
      )}
      <div ref={containerRef} className="cw-chatkit-frame" data-chatkit-container />
    </div>
  );
}
