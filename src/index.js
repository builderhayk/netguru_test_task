import "./database";
import App from "./app";
import { apiPort } from "./appConfig/config";

const WebServer = new App();

WebServer.app.listen(apiPort || 8080, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running at ${apiPort}`);
});

export const server = {
    app: WebServer.app
};