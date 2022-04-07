import { ViteDevServer } from "vite";
interface options {
    data: string;
    entry: string;
}
export default function (options?: options): {
    configureServer: (app: ViteDevServer) => void;
};
export {};
