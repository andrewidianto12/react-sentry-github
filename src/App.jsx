import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import viteLogo from "/vite.svg";

let release = "react-sentry-github@1.0.0";

Sentry.init({
  dsn: "https://cbaec468c541fb9b8465856260838b52@o4506948520837120.ingest.us.sentry.io/4506948853104645",
  integrations: [new BrowserTracing(), Sentry.replayIntegration()],
  release: release,
  //
  //
  //
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.

  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

class validationError extends Error {
  constructor(message) {
    super(message);
    this.name = `ERROR: "${message}" from ${release} `;
  }
}

function App() {
  const [count, setCount] = useState(0);

  function handleclick(message) {
    throw new validationError(message);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            handleclick("Error brooo");
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Sentry.withProfiler(App);
