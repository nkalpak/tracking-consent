import { useLocalStorage } from "react-use";
import React from "react";
import { Helmet } from "react-helmet";

export function useTrackingConsent(localStorageKey: string) {
  const [hasConsented, setHasConsented, removeLocalStorageEntry] =
    useLocalStorage(localStorageKey, false);

  return React.useMemo(
    () => ({
      hasConsented: hasConsented ?? false,
      toggleConsent: () => {
        if (hasConsented) removeLocalStorageEntry();
        else setHasConsented(true);
      },
    }),
    [removeLocalStorageEntry, setHasConsented, hasConsented]
  );
}

export type ScriptProps = Partial<
  Pick<HTMLScriptElement, "type" | "async" | "src" | "innerHTML" | "defer">
>;

export function RenderTrackingScripts({
  shouldRender,
  scripts,
}: {
  shouldRender: boolean;
  scripts: ScriptProps[];
}) {
  return <Helmet script={shouldRender ? scripts : []} />;
}
