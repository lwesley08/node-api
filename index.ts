import * as http from 'http';
import App from './app/app';
import { initDb } from './app/db';
const port = 3070;

initDb((err: any) => {
    App.set('port', port);
    const server = http.createServer(App);
    server.listen(port);
    
    server.on('listening', (): void => {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    });
    
    module.exports = App;
})