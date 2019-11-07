import mysql from "mysql";
import { Connection } from "mysql";

var connectMySQL = (): Connection => {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        // tslint:disable-next-line: object-literal-sort-keys
        password: "",
        database: "employeedb",
        multipleStatements: true
    });
};

export class ConnectDB {

    public static onConnect = () => {
        connectMySQL().connect((error) => {
            if (!error) {
                console.log('connected to MySQL');
            } else {
                console.log('connected to MySQL' + JSON.stringify(error));
            }
        })
    }

    public static querySQL(sql: any, param: any, callback: any): any {
        if (param == null) {
            connectMySQL().query(sql, (error, result) => {
                if (error) {
                    return callback(null);
                } else {
                    return callback(result);
                }
            });
        } else {
            connectMySQL().query(sql, param, (error, result) => {
                if (error) {
                    return callback(null);
                } else {
                    return callback(result);
                }
            });
        }
    }

}

