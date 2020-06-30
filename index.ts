import * as http from 'http';
import App from './app/app';
import { initDb } from './app/db';
const port: number = 3070;

initDb((err: any): void => {
    App.set('port', port);
    const server: http.Server = http.createServer(App);
    server.listen(port);

    server.on('listening', (): void => {
        const addr: any = server.address();
        const bind: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    });

    module.exports = App;
})
