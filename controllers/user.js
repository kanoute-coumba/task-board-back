const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Votre compte employé créé !'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.login = (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user === null) {
                res.status(401).json({
                    message: 'Paire utilisateur / Mot de passe incorrecte'
                })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            retres.status(401).json({
                                message: 'Paire utilisateur / Mot de passe incorrecte'
                            })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                    )
                            })
                        }
                    })
                     .catch(error => res.status(500).json({
                        error
                    }))
            }
        })
        .catch(error => res.status(500).json({
            error
        }))
};

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({
            error
        }))
};

exports.getOneUser = (req, res, next) => {
    User.findOne({
            _id: req.params.id
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({
            error
        }))
};

exports.deleteUser = (req, res, next) => {
    User.findOne({
            _id: req.params.id
        })
        .then(user => {
            if (user.userId != req.auth.userId) {
                res.status(401).json({
                    message: 'Not authorized'
                });
            } else {
                const filename = task.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    User.deleteOne({
                            _id: req.params.id
                        })
                        .then(() => {
                            res.status(200).json({
                                message: 'Employé supprimé !'
                            })
                        })
                        .catch(error => res.status(401).json({
                            error
                        }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error
            });
        });
};

exports.modifyUser = (req, res, next) => {
    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };

    delete userObject._userId;
    User.findOne({
            _id: req.params.id
        })
        .then((user) => {
            if (user.userId != req.auth.userId) {
                res.status(401).json({
                    message: 'Not authorized'
                });
            } else {
                User.updateOne({
                        _id: req.params.id
                    }, {
                        ...userObject,
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Profil modifié!'
                    }))
                    .catch(error => res.status(401).json({
                        error
                    }));
            }
        })
        .catch((error) => {
            res.status(400).json({
                error
            });
        });
};

exports.createUser = (req, res, next) => {
    const userObject = JSON.parse(req.body.user);
    delete userObject._id;
    delete userObject._userId;
    const user = new User({
        ...userObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    user.save()
        .then(() => {
            res.status(201).json({
                message: 'Employé enregistrée !'
            })
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
};