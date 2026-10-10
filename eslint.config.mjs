import { defineConfig, globalIgnores } from "eslint/config"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

export default defineConfig([
    // Build output and generated Cloudflare types.
    globalIgnores(["out/**", ".wrangler/**", "worker/worker-configuration.d.ts"]),
    {
        extends: [...nextCoreWebVitals, ...nextTypescript],
    },
])
