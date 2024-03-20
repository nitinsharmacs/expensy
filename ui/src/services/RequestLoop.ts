import BufferManager from './BufferManager';
import Server from './Server';

class RequestLoop {
  private static INTERVAL: number = 8000;

  static start() {
    const interval: NodeJS.Timeout = setInterval(async () => {
      if (await Server.isSleeping()) {
        return;
      }

      const tasks = BufferManager.getAll();

      if (tasks.length === 0) {
        return clearInterval(interval);
      }

      tasks.forEach(async (task) => {
        await task();
      });

      return clearInterval(interval);
    }, RequestLoop.INTERVAL);
  }
}

export default RequestLoop;
