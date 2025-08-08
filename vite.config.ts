/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        libInjectCss(),
        dts({ 
            rollupTypes: true, 
            tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
            exclude: ["**/*.test.*", "**/*.spec.*"] 
        })
    ],
    build: {
        emptyOutDir: mode !== 'bundle',
        lib: {
            entry: resolve(__dirname, "lib/index.ts"),
            name: "ChatWidget",
            fileName: (format) => `chat-widget.${format}.js`,
            formats: ["es", "umd"],
        },
    rollupOptions: {
        external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
            "react-dom/client": "ReactDOM",
                    "react/jsx-runtime": "jsxRuntime",
                },
                assetFileNames: (assetInfo) => {
                    // Force CSS to the documented name
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'style.css';
                    }
                    return 'assets/[name][extname]';
                },
            },
        },
        sourcemap: true,
        minify: "esbuild",
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/test/',
                'examples/',
                'dist/',
                '**/*.d.ts',
                '**/*.config.*',
                'coverage/',
            ],
        },
    },
}));
