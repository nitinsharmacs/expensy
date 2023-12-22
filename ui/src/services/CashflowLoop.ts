import BufferManager from './BufferManager';
import CashflowAPIService from './CashflowAPIService';
import Server from './Server';

class CashflowLoop {
  private static INTERVAL: number = 8000;
  private static started: boolean = false;

  static start() {
    if (this.started) return;

    const interval: NodeJS.Timeout = setInterval(async () => {
      if (await Server.isSleeping()) {
        return;
      }

      const items = BufferManager.get('entries');

      if (items.length > 0) await CashflowAPIService.postEntries(items);

      BufferManager.clear('entries');

      return clearInterval(interval);
    }, CashflowLoop.INTERVAL);
  }
}

export default CashflowLoop;
