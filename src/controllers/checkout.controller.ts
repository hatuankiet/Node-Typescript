import { Request, Response } from "express";
import { LoginModel } from "../models/login.model";

export class CheckoutController {

    public checkOut(req: Request, res: Response) {
        if (req!.session!.username) {
            var cartUser: any = req!.session!.cartUser;
            if (cartUser[0].price.constructor === Number) {
                for (let i = 0; i < cartUser.length; i++) {
                    cartUser[i].price = Number(cartUser[i].price).toLocaleString();
                };
            }
            return res.render("./../views/checkout.pug", {
                amount: req!.session!.amount,
                cartUser: cartUser,
                title: "Checkout",
                username: req!.session!.username
            });
        } else {
            res.redirect("/");
        }
    }
}

