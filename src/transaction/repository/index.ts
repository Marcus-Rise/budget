import { TransactionLocalStorageRepository } from "./transaction-local-storage.repository";
import { TransactionApiRepository } from "./transaction-api.repository";

const localStorageRepository = new TransactionLocalStorageRepository();
const apiRepository = new TransactionApiRepository();

export { apiRepository, localStorageRepository };
