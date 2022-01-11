import { useLocalStorage } from "react-use";
import React from "react";
import { Helmet } from "react-helmet";

function clearCookies() {
  try {
    document.cookie.split(";").forEach(function (cookie) {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  } catch {
    // try/catch in case something fails in different browsers
  }
}

export function useTrackingConsent(localStorageKey: string) {
  const [hasConsented, setHasConsented, removeLocalStorageEntry] =
    useLocalStorage(localStorageKey, false);

  return React.useMemo(
    () => ({
      hasConsented: hasConsented ?? false,
      toggleConsent: () => {
        if (hasConsented) {
          clearCookies();
          removeLocalStorageEntry();
        } else {
          setHasConsented(true);
        }
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
