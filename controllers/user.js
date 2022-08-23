const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                accountType: req.body.accountType,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                role: req.body.role,
                password: hash
            });
            user.save()
                .then((doc) => {
                 const computedUser = user.toObject()
                 delete computedUser.password
                    res.status(201).json({
                        statusCode:201,
                        message: 'Votre compte employé créé !',
                        data:computedUser
                    })
                })
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
                    message: 'Utilisateur introuvable'
                })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            retres.status(401).json({
                                message: 'Mot de passe incorrecte'
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
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
  }

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
  };

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Utlisateur supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }
exports.modifyUser = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'utilisateur modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.createUser = (req, res, next) => {
    delete req.body._id;
    const user = new User({
      ...req.body
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }