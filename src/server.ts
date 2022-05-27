import { httpServer } from './http';
import './websocket';

httpServer.listen(3000, () => {
  console.log('🚀 ~ file: server.ts ~ line 4 ~ httpServer.listen ~', 3000);
});
