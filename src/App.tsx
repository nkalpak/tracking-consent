import React from "react";
import {
  RenderTrackingScripts,
  ScriptProps,
  useTrackingConsent,
} from "./tracking-consent";

const googleScripts: ScriptProps[] = [
  {
    async: true,
    src: "https://www.googletagmanager.com/gtag/js?id=UA-51176136-6",
  },
  {
    type: "text/javascript",
    innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
        
              gtag('config', 'UA-51176136-6');
            `,
  },
];

const mouseflowScripts: ScriptProps[] = [
  {
    type: "text/javascript",
    innerHTML: "window._mfq = window._mfq || [];",
  },
  {
    type: "text/javascript",
    defer: true,
    src: "//cdn.mouseflow.com/projects/79404782-2bdb-4130-b959-33c8dbf0f040.js",
  },
];

const albacrossScripts: ScriptProps[] = [
  {
    type: "text/javascript",
    innerHTML: "window._nQc = '89439336';",
  },
  {
    async: true,
    src: "https://serve.albacross.com/track.js",
  },
];

function App() {
  const { hasConsented, toggleConsent } = useTrackingConsent(
    "project-name::cookie-consent"
  );

  return (
    <div className="App">
      <button onClick={toggleConsent}>Click me</button>

      <RenderTrackingScripts
        shouldRender={hasConsented}
        scripts={[...googleScripts, ...mouseflowScripts, ...albacrossScripts]}
      />
    </div>
  );
}

export default App;
