# api-back nodejs

Utilisation des outils :
 - Express.js : https://expressjs.com/
 - Sequelize ORM : https://sequelize.org/
 - Passport.js : http://www.passportjs.org/
 - BcryptJS : https://github.com/dcodeIO/bcrypt.js
 
 AWS EC2  Url de l'api-back : http://ec2-3-134-247-184.us-east-2.compute.amazonaws.com:3000/


Différents routes : 


##### Se connecter :
POST : {URL_API}/auth/login <br>
params :
- email `String`
- password `String`


##### Créer un utilisateur :

POST : {URL_API}/users <br>
params :
- name  `String`
- surname: `String`
- email: `String`
- password: `String`
- birthday: `Date`

##### Modifier un utilisateur :

PUT : {URL_API}/users <br>
params :
- name  `String`
- surname: `String`
- email: `String`
- password: `String`
- birthday: `Date`

##### Récupérer la liste des utilisateurs :

GET : {URL_API}/users <br>

##### Récupérer un utilisateur :

GET : {URL_API}/users/{id} <br>
params :
- id  `Int`

##### Supprimer un utilisateur :

DELETE : {URL_API}/users/{id} <br>
params :
- id  `Int`
