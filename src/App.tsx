import { useState } from "react";
import { VersionBadge } from "@/components/VersionBadge";
import { Settings } from "@/config/env";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 p-6">
      <VersionBadge
        env={Settings.APP_ENV}
        version={Settings.VERSION}
        commit={Settings.COMMIT_SHA}
      />
      <h1 className="text-3xl font-bold">Vite CI/CD Playground</h1>
      <p className="text-gray-600">
        Backend: <code>{Settings.BASE_URL}</code>
      </p>
      <button
        type="button"
        className="w-fit rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => setCount((c) => c + 1)}
      >
        Clicked {count} times
      </button>
    </main>
  );
}
