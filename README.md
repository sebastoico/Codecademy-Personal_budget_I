# Codecademy - Personal budget I

Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update, and delete envelopes.

## Running the app
To run locally, run `npm install`, then `npm run start`

Once the app is running locally, you can access the API at `http://localhost:3000/`

## Testing with Postman
To test with Postman:
 - Retrieve envelopes using `GET /envelopes`
 - Retrieve a single envelope using `GET /envelopes/{id}`
 - Create an envelope using `POST /envelopes`
 - Update an envelope using `PUT /envelopes/{id}`
 - Delete an envelope using `DELETE /envelopes/{id}`
 - Transfer money between envelopes using `POST /envelopes/transfer/{fromId}/{toId}`
