import { ConnectDB } from './../db/connect';


export class LoginModel {

    public getUsers(username: string, password: string, callback: CallableFunction) {
        let query = "SELECT * FROM users WHERE username= ? AND password=?";
        let params = [username, password];
        ConnectDB.querySQL(query, params, (results: any) => {
            const queryUserData = `SELECT cartuser.id,nameproduct,price,img,amount,productid,userid FROM product INNER JOIN cartuser ON product.id = cartuser.productid HAVING userid = ${results[0].id} `;
            ConnectDB.querySQL(queryUserData, null, (cart: any) => {
                callback(results, cart);
            });
        });

    }

} 
