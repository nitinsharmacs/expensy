import { NewEntryState } from '../screens/NewEntry/NewEntry';
import BufferManager from './BufferManager';
import CashflowAPIService from './CashflowAPIService';
import CashflowLoop from './CashflowLoop';
import Server from './Server';

class CashflowService {
  static async create(newEntry: NewEntryState): Promise<Response> {
    if (await Server.isSleeping()) {
      BufferManager.add('entries', newEntry);

      CashflowLoop.start();

      return Promise.resolve(new Response());
    }

    return CashflowAPIService.postEntry(newEntry);
  }
}

export default CashflowService;
