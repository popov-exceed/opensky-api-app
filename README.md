# Demo of the app
Curently site is deployed at https://popov-exceed.github.io/opensky-api-app/

# How to start project

In order to use this app, you need to
[Create Account on OpenSky Network](https://opensky-network.org/index.php?option=com_users&view=registration). \
To start the development server, open project folder in cli and write:

### `npm start`
\
press enter and then go to http://localhost:3000/.

If you want to build the project for deployment, enter in your terminal this:

### `npm run build`
\
after that, in project will appear build folder, where optimized static files are stored.

# How to run tests

To start tests enter in your cli:

### `npm run test`
\
Right now implemented tests for a reducer and async actions.
# How to use this app

On a startup enter your credentials from OpenSky Network Account or press **Sign Up** button to create one. 

Then, you should see the lists of all flight with data in that order AIRPORT | TIME | ARRIVING | DEPARTING. 
The data is appearing in the interval of two hours from last date 
(because data in OpenSky Network API does not [updates dynamically](https://opensky-network.org/about/faq#q14))

On an update, app is requesting new data in current time - one hour

On logout, you will be redirected on login screen and will have to sign in again.

There also implemented pagination that splits data into chunks of 20 flight per a page.

# What is done
Right now in project implemented: 
- Authentication;
- Tests for a reducer and async actions; 
- Table of flights with pagination;  
- **Update** and **Logout** buttons.

# What I would want to add
- Flights filtering by time, airport
- Flights ordering by an airport, time, arriving and departing.
- Overall flights calculation by an airport.
