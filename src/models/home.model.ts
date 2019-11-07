import { ConnectDB } from './../db/connect';


export class HomeModel {

    public productList(callback: any): any {
        const query = "SELECT * FROM product";
        ConnectDB.querySQL(query, null, (result: any) => {
            return callback(result);
        });

    }

    public getProduct(id: number, callback: CallableFunction): any {
        const query = "SELECT nameproduct,id,price,img as product FROM product WHERE id=?";
        ConnectDB.querySQL(query, id, (result: any) => {
            return callback(result);
        });
    }

    public saveProduct(userid: number, idproduct: number, callback: CallableFunction) {
        const queryExist = `SELECT amount,productid FROM cartuser WHERE userid = ? HAVING productid = ${idproduct} `;
        const querySelect = " SELECT nameproduct,price,img,amount as cart FROM product INNER JOIN cartuser ON product.id = cartuser.productid ";
        ConnectDB.querySQL(queryExist, [userid], (result: any) => {
            if (result.length > 0) {
                let query = `UPDATE cartuser SET amount = ${result[0].amount + 1} WHERE userid = ${userid} AND productid = ${idproduct} `;
                // tslint:disable-next-line:no-shadowed-variable
                ConnectDB.querySQL(query, null, (result: any) => {
                    if (result.affectedRows) {
                        ConnectDB.querySQL(querySelect, null, (cart: any) => {
                            return callback(cart);
                        });
                    } else {
                        return callback(result);
                    }
                });
            } else {
                let query = "INSERT INTO cartuser (userid,productid,amount) VALUES (?,?,?)";
                let params = [userid, idproduct, 1];
                // tslint:disable-next-line:no-shadowed-variable
                ConnectDB.querySQL(query, params, async (result: any) => {
                    if (result.affectedRows) {
                        ConnectDB.querySQL(querySelect, null, (cart: any) => {
                            return callback(cart);
                        });
                    } else {
                        return callback(result);
                    }
                });
            }
        });


    }


} 
