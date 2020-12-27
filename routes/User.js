const express = require("express");
const userRouter = express.Router();

const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/Users");
const Cart = require("../models/Cart");

const signToken = userID => {
    return JWT.sign({
        iss: "IDKMAN",
        sub: userID
    }, "IDKMAN", {
        expiresIn: "1h"
    });
}

userRouter.post("/register", (req, res) => {
    const {
        username,
        password,
        role
    } = req.body;

    User.findOne({
        username
    }, (err, user) => {
        if (err)
            res.status(500).json({
                message: {
                    msgBody: "Error has occured",
                    msgError: true
                }
            });
        if (user) {
            res.status(400).json({
                message: {
                    msgBody: "Username is already taken",
                    msgError: true
                }
            });
        } else {
            const newUser = new User({
                username,
                password,
                role
            });
            newUser.save(err => {
                if (err)
                    res.status(500).json({
                        message: {
                            msgBody: "Error has occured",
                            msgError: true
                        }
                    });
                else
                    res.status(201).json({
                        message: {
                            msgBody: "User successfully Registered",
                            msgError: false
                        }
                    });
            });
        }

    });
});


userRouter.post("/login", passport.authenticate('local', {
    session: false
}), (req, res) => {
    if (req.isAuthenticated()) {
        const {
            _id,
            username,
            role
        } = req.user;
        const token = signToken(_id);
        //httpOnly & sameSite require for security reasons
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: true
        });

        res.status(200).json({
            isAuthenticated: true,
            user: {
                username,
                role
            }
        });
    }
});

userRouter.get('/logout', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.clearCookie('access_token');
    res.json({
        user: {
            username: "",
            role: ""
        },
        success: true
    });
});

userRouter.post('/cart', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const cart = new Cart(req.body);
    cart.save(err => {
        if (err)
            res.status(500).json({
                message: {
                    msgBody: "Error has occured",
                    msgError: true
                }
            })
        else {
            req.user.cart_items.push(cart);
            req.user.save(err => {
                if (err)
                    res.status(500).json({
                        message: {
                            msgBody: "Error has occured",
                            msgError: true
                        }
                    });
                else
                    res.status(200).json({
                        message: {
                            msgBody: "Successfully added to cart",
                            msgError: false
                        }
                    });
            });
        }

    });
});

userRouter.get("/cart", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    User.findById({
        _id: req.user._id
    }).populate('cart_items').exec((err, document) => {
        if (err)
            res.status(500).json({
                message: {
                    msgBody: "Error has occured",
                    msgError: true
                }
            });
        else {
            res.status(200).json({
                cart_items: document.cart_items,
                authenticated: true
            });
        }
    })
})

userRouter.get("/admin", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    if (req.user.role === "admin") {
        res.status(200).json({
            message: {
                msgBody: "You are an admin",
                msgError: false
            }
        });
    } else {
        res.status(403).json({
            message: {
                msgBody: "You're not the admin, go away!",
                msgError: true
            }
        });
    }
});

userRouter.get("/authenticated", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        username,
        role
    } = req.user;
    res.status(200).json({
        isAuthenticated: true,
        user: {
            username,
            role
        }
    });
});

module.exports = userRouter;