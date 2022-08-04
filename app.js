const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose =  require('mongoose');
const taskRoutes = require('./routes/task')
const userRoutes = require('./routes/user')
const path = require('path'); // Pour multer
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// app.use(express.json());

//les middlewares next()

// Le CORS définit comment les serveurs et les navigateurs interagissent, en spécifiant 
// quelles ressources peuvent être demandées de manière légitime – par défaut, 
// les requêtes AJAX sont interdites.
  
  // connection to a mongo database
mongoose.connect('mongodb+srv://coumba:passer@vuecrud.psuw6.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });

app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app ;

// app.use((req, res, next) => {
//     console.log('requete reçue!');
//     next();
// })

// app.use((req, res, next) => {
//     res.json({message: 'Votre reponse est bien recu'})
//     next();
// })

// app.use((req, res, next) => {
//     console.log('reponse recue !')
//     next();
// })


    // const stuff = [
    //   {
    //     _id: 'oeihfzeoi',
    //     title: 'Mon premier objet',
    //     description: 'Les infos de mon premier objet',
    //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //     price: 4900,
    //     userId: 'qsomihvqios',
    //   },
    //   {
    //     _id: 'oeihfzeomoihi',
    //     title: 'Mon deuxième objet',
    //     description: 'Les infos de mon deuxième objet',
    //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //     price: 2900,
    //     userId: 'qsomihvqios',
    //   },
    // ];
    // res.status(200).json(stuff);
