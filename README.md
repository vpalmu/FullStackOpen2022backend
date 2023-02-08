# Phonebook Backend

This is the backend for a phonebook application. It is built using Node.js, Express, Mongoose, Morgan and Cors. 

## Scripts

* `start`: Starts the server with Node.js. 
* `dev`: Starts the server with Nodemon for development purposes. 
* `test`: Runs tests on the application (not yet implemented). 
* `build:ui`: Builds the UI for the application from a separate repository. 
* `deploy`: Deploys the application to a production environment. 
* `deploy:full`: Builds and deploys the application to a production environment in one step. 
* `logs:prod`: Displays logs from a production environment. 
* `lint`: Lints all files in the project with ESLint.  

## Dependencies 

 * cors - For handling Cross-Origin Resource Sharing (CORS) requests.  
 * dotenv - For loading environment variables from a .env file into process.env  
 * express - For creating an Express web server  
 * mongoose - For creating MongoDB schemas and models  
 * morgan - For logging HTTP requests  

## Dev Dependencies

 * eslint - For linting all files in the project  
 * nodemon - For restarting the server automatically when changes are made

## Live

 * deployed on: https://vpalmu-phonebook-api.fly.dev/
 * database in https://cloud.mongodb.com/