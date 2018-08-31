This is a sample app for my application with assurehire.
Clone the repo.

You will need NodeJs installed on your machine.

run npm install
run npm start

The app runs on port 8000. Open a browser window at localhost:8000 and use the app.

The app is a simple weather forcat getter for a city, or a zip code.

If the user enters an invalid city or zipcode the app will give an alert.

Else the app will give current weather forcast data for that location as long as its in the United States.

If the user enters the same zip code more than once per page load, the app will remember and pull the data from an http cache.