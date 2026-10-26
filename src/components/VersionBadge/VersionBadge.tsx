type AppEnv = "local" | "development" | "staging" | "production";

const envStyles: Record<AppEnv, string> = {
  local: "bg-gray-100 text-gray-800",
  development: "bg-blue-100 text-blue-800",
  staging: "bg-amber-100 text-amber-800",
  production: "bg-green-100 text-green-800",
};

export interface VersionBadgeProps {
  env: AppEnv;
  version: string;
  commit: string;
}

export function VersionBadge({ env, version, commit }: VersionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <span
        data-testid="env"
        className={`rounded-full px-3 py-1 font-medium ${envStyles[env]}`}
      >
        {env}
      </span>
      <span>v{version}</span>
      <code className="text-gray-500">{commit}</code>
    </div>
  );
}
