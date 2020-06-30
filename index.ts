import * as http from 'http';
import App from './app/app';
import { initDb } from './app/db';
const port = 3070;

initDb((err: any) => {
    App.set('port', port);
    const server = http.createServer(App);
    server.listen(port);

    server.on('listening', (): void => {
        const addr = server.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    });

    module.exports = App;
})
