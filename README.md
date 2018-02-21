# ExpressReactFullStack
This is a full stack website developed by `Express.js`, `React.js` ,`MongoDB`.
For the `Heroku` Link: https://boiling-hollows-82361.herokuapp.com/

## Run
`npm install`
### run front end
`npm run start`
### run back end
`node index.js`
### run frond end and back end , used concorrently can run them at the same time
`npm run dev`

## Login
Login used google-oauth2 API.
## Before Login
Before login ,this website can order a burger . Customers can customize a burger and calculate how much should pay.
On the payment section , it used `Stripe-api` as a payment third part api to finish the payment process.
## After Login
After login , user can add a survey and send to many email address. On the dashboard , user can see the dispalyed surveys which 
they created and send out. 
This section , it used `Redux Form` to creat and validate the survey.`SendGrid` is a very helpful tool to send out the survey as emails to users. And `Localtunnel`to transform the server data to the local server.


