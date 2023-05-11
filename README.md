# user-auth-system
clone this project use HTTPS or SSH link
make sure NodeJs is installed.

step 1:
  inside project directory
  create .env file and the following variables:
  PORT = {port you wnat your server to run on},
  DB_URL = {add mongo DB url} ,
  SALT_ROUNDS = {any number between 5-10 will work, this is number of time encryption will be added}, 
  SECRET = {string eith unique characters for session management},
  MAIL_ID = {email id on through which emails will be sent to users}, 
  MAIL_PASSWORD = {password for above email},
  JWT_EXPIRY_TIME = {string example 1h , the amount of time after which JWT token will expire},
  JWT_SECRET_KEY = {string with uncique characters which will be used for encryption}

step 2: 
  enter command : 
                npm i
  this command will install all the dependecies from package.json file

step 3: 
  Run project by entering command : 
                                  npm start
  
