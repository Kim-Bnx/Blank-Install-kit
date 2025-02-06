import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        "process.env": {}, // ✅ Supprime l'erreur "process is not defined"
    },
    build: {
        outDir: "dist",
        lib: {
            entry: "src/main.jsx", // Utilisation d'un fichier principal JavaScript
            name: "BlankThemeInstaller", // Nom de la variable globale (window.BlankThemeInstaller)
            fileName: (format) => `blank-theme-installer.${format}.js`, // Générer blank-theme-installer.umd.js
            formats: ["umd"], // Générer un fichier compatible avec les balises <script>
        },
        rollupOptions: {
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
        },
    },
});
