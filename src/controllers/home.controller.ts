import { Request, Response } from "express";
import { HomeModel } from './../models/home.model';
import { LoginModel } from "./../models/login.model";

export class HomeController {

    constructor() {
    }

    public index(req: Request, res: Response) {
        if (req!.session!.username) {
            new HomeModel().productList((data: any) => {
                for (let i = 0; i < data.length; i++) {
                    data[i].price = Number(data[i].price).toLocaleString();
                };
                return res.render("./../views/home.pug", {
                    title: "Home",
                    listproduct: data,
                    username: req!.session!.username,
                    amount: req!.session!.amount
                });
            });
        } else {
            new HomeModel().productList((data: any) => {
                for (let i = 0; i < data.length; i++) {
                    data[i].price = Number(data[i].price).toLocaleString('it-IT', {
                        currency: "VND",
                        style: "currency"
                    });
                };
                return res.render("./../views/home.pug", {
                    listproduct: data,
                    title: "Home",
                    user: null
                });
            });
        }
    }

    public login(req: Request, res: Response) {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            new LoginModel().getUsers(username, password, (result: any, cart: any) => {
                let sumCart = 0;
                const cartUser: any = cart || [];
                for (let i = 0; i < cart.length; i++) {
                    sumCart += cart[i].amount;
                }
                if (result.length > 0) {
                    req!.session!.username = req.body.username;
                    req!.session!.iduser = result[0].id;
                    req!.session!.amount = sumCart;
                    req!.session!.cartUser = cartUser;
                    res.json({
                        code: 200,
                        message: "hoàn thành",
                    });
                } else {
                    res.json({
                        code: 404,
                        message: "sai tai khoan mat khau"
                    });
                }
            });
        }
    }

    public logOut(req: Request, res: Response) {
        req!.session!.destroy(error => {
            if (error) {
                console.log(error);
            } else {
                res.clearCookie('userid');
                res.json({
                    code: 200,
                    message: 'đã logout',
                });
            }
        });
    }

    public onBuyProduct(req: Request, res: Response) {
        const id = req.body.id;
        // const userid = req.cookies['userid'];
        const userid = req!.session!.iduser;
        new HomeModel().getProduct(id, (product: any) => {
            if (product[0].id && userid) {
                new HomeModel().saveProduct(userid, product[0].id, (result: any) => {
                    req!.session!.cartUser = result;
                    let amount = 0;
                    for (let i = 0; i < result.length; i++) {
                        amount += result[i].cart;
                    };
                    req!.session!.amount = amount;
                    res.json({
                        product: result
                    });
                });
            }
        });
    }

}


