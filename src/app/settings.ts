import env from "codeforlife/settings"

export * from "codeforlife/settings"

// Example of how to get an environment variable.
export const EXAMPLE = env.VITE_EXAMPLE ?? "DEFAULT_VALUE"
