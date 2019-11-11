import { Request, Response } from "express";
import { CheckoutModel } from "./../models/checkout.model";
export class CheckoutController {

    public checkOut(req: Request, res: Response) {
        if (req!.session!.username) {
            var cartUser: any = req!.session!.cartUser;
            if (cartUser[0].price.constructor === Number) {
                for (let i = 0; i < cartUser.length; i++) {
                    cartUser[i].price = Number(cartUser[i].price).toLocaleString();
                };
            }
            let sum = 0;
            for (let i = 0; i < cartUser.length; i++) {
                sum += cartUser[i].amount;
            }
            req!.session!.amount = sum;
            return res.render("./../views/checkout.pug", {
                amount: sum,
                cartUser: cartUser,
                title: "Checkout",
                username: req!.session!.username
            });
        } else {
            res.redirect("/");
        }
    }

    public onIncrease(req: Request, res: Response) {
        const id = req!.body!.id;
        new CheckoutModel().onIncrease(id, (result: any) => {
            if (result.affectedRows === 1) {
                let cartuser: any = req!.session!.cartUser;
                new Promise((resolve, reject) => {
                    for (let i = 0; i < cartuser.length; i++) {
                        if (cartuser[i].id == id) {
                            cartuser[i].amount += 1;
                        }
                    }
                    resolve(cartuser);
                }).then((data: any) => {
                    let sum = 0;
                    for (let i = 0; i < data.length; i++) {
                        sum += data[i].amount;
                    }
                    req!.session!.cartUser = data;
                    req!.session!.amount = sum;
                });
                res.json({
                    code: 200,
                    message: 'Success'
                });
            } else {
                res.json({
                    code: 404,
                    message: 'Failed'
                });
            }
        });
    }
    public onDecrease(req: Request, res: Response) {
        const id = req!.body!.id;
        new CheckoutModel().onDecrease(id, (result: any) => {
            if (result.affectedRows === 1) {
                let cartuser: any = req!.session!.cartUser;
                new Promise((resolve, reject) => {
                    for (let i = 0; i < cartuser.length; i++) {
                        if (cartuser[i].id == id) {
                            cartuser[i].amount -= 1;
                        }
                    }
                    resolve(cartuser);
                }).then((data: any) => {
                    let sum = 0;
                    for (let i = 0; i < data.length; i++) {
                        sum -= data[i].amount;
                    }
                    req!.session!.cartUser = data;
                    req!.session!.amount = sum;
                });
                res.json({
                    code: 200,
                    message: 'Success'
                });
            } else {
                res.json({
                    code: 404,
                    message: 'Failed'
                });
            }
        });
    }




}

