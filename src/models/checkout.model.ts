
import { ConnectDB } from "./../db/connect";

export class CheckoutModel {

    public onIncrease(id: number, callback: CallableFunction) {
        const query = "UPDATE cartuser SET amount = amount + 1 where id = ? ";
        ConnectDB.querySQL(query, id, (result: any) => {
            return callback(result);
        });
    }
    public onDecrease(id: number, callback: CallableFunction) {
        const query = "UPDATE cartuser SET amount = amount - 1 where id = ? ";
        ConnectDB.querySQL(query, id, (result: any) => {
            return callback(result);
        });
    }
}

