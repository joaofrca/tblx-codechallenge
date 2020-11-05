# TB.LX CODE CHALLENGE

This repository provides all dependencies to run a web service that exposes a RESTful API written in Node with Express and MongoDB.

## Installing NPM

Get NPM from [here](https://www.npmjs.com/get-npm).

## Installing MongoDB

MongoDB Community Edition was used in this project. Installation requirements and guide can be found [here](https://docs.mongodb.com/manual/administration/install-community/).

As the GUI for MongoDB, MongoDB Compass was used. It can downloaded for free [here](https://www.mongodb.com/try/download/compass).

## Installing Postman

Postman is a collaboration platform for API development, and can be downloaded for free [here](https://www.postman.com/downloads/). It was the tool used for the construction and testing of the API endpoints.

## Execution

#### 0. Clone repo to your local

On the folder's directory run:

```
git clone https://github.com/joaofrca/tblx-codechallenge.git
```

#### 1. Install the project dependencies

On the folder's directory run:

```
npm install OR npm i
```

#### 2. Data Load

Three environments exist within this project: DEV, TEST, PRD(TODO).
In order to use the DEV environments and run the test files, one shall manually import the data into the MongoDB.

On the folder's directory, navigate to ./dataset folder. From the zip file which can be found [here](https://codechallengestracc.blob.core.windows.net/code-challenge/dublin-dataset.zip), download the 'siri.20130130.csv' file and add into the folder, making it two csv files:

- siri.20130130.csv
- siri.20130130-small-test.csv

These files contain the dataset used for DEV and TEST environments. A first line shall be added into 'siri.20130130.csv', containing the following header of the model/schema:

```
timestamp,lineID,direction,journeyPatternID,timeframe,vehicleJourneyID,operator,congestion,lon,lat,delay,blockID,vehicleID,stopID,atStop
```
The file 'siri.20130130-small-test.csv' already contains the above header.

To load the data, one shall manually run, in the ./dataset path:

```
mongoimport -d <db_name> -c <collection_name> --type csv --file <file_name> --headerline
```

Where, for DEV environment:

```
db_name = busDEV
collection_name = busgps
file_name = siri.20130130.csv
```

And for TEST environment:

```
db_name = busTEST
collection_name = busgps
file_name = siri.20130130-small-test.csv
```

If a different dataset is to be used, one shall modify the script accordingly and add the headerline to the csv file which will be loaded. The busTEST DB is expecting this file_name though, and changing it will make the tests fail.

#### 2. Run the project

On the folder's directory run:

```
npm start
```

The server will run on localhost:4000.

#### 3. Play around with the app using Postman

Use Postman to try the application. Four routes are available:

1.  Given a time frame [start-time, end-time], what is the list of running operators?

- get : [localhost:4000/task1/:starttime/:endtime](localhost:4000/task1/:starttime/:endtime)
  Requires keys:
  - starttime (ISO 8601)
  - endtime (ISO 8601)

2. Given a time frame [start-time, end-time] and an Operator, what is the list of vehicle IDs?

- get : [localhost:4000/task2/:starttime/:endtime/:operator](localhost:4000/task2/:starttime/:endtime/:operator)
  Requires keys:
  - starttime (ISO 8601)
  - endtime (ISO 8601)
  - operator

3. Given a time frame [start-time, end-time] and a fleet, which vehicles are at a stop?

- get : [localhost:4000/task3/:starttime/:endtime/:operator](localhost:4000/task3/:starttime/:endtime/:operator)
  Requires keys:
  - starttime (ISO 8601)
  - endtime (ISO 8601)
  - operator

4. Given a time frame [start-time, end-time] and a vehicle, return the trace of that vehicle (GPS entries, ordered by timestamp).

- get : [localhost:4000/task4/:starttime/:endtime/:vehicleID](localhost:4000/task4/:starttime/:endtime/:vehicleID)
  Requires keys:
  - starttime (ISO 8601)
  - endtime (ISO 8601)
  - vehicleID

All Routes require the parameters in the Endpoint to be modified accordingly. No body required in the request.

Note: Do not forget to add data to the DEV environment as explained in step 2.

#### 4. Run the tests

On the folder's directory run:

```
npm test
```

Note: Do not forget to add data to the TEST environment as explained in step 2.

# Examples

Take a look at the examples below, and check swagger/tblx-codechallenge.yml file for swagger documentation.

#### 1. localhost:4000/task1/:starttime/:endtime

- starttime = 2012-11-30T00:00:01
- endtime = 2012-11-30T00:10:00
  > expected result = {
              "result": [
                  "PO",
                  "CD",
                  "HN",
                  "D2",
                  "RD",
                  "CF",
                  "SL",
                  "D1"
              ],
              "statusCode": 200
          }

#### 2. localhost:4000/task2/:starttime/:endtime/:operator

- starttime = 2012-11-30T00:00:01
- endtime = 2012-11-30T00:10:00
- operator = CD
  > expected result = {
            "result": [
                38054,
                33297,
                33518,
                33298,
                33407,
                43026,
                43028,
                33358,
                33608,
                33288,
                33296,
                33359,
                33195,
                38061,
                33294,
                43024,
                38053
            ],
            "statusCode": 200
        };

#### 3. localhost:4000/task3/:starttime/:endtime/:operator

- starttime = 2012-11-30T00:00:01
- endtime = 2012-11-30T00:10:00
- operator = HN
  > expected result = {
            "result": [
                33359,
                43024,
                33407,
                43028,
                33296,
                33288,
                33298,
                33294,
                38054,
                38061
            ],
            "statusCode": 200
        }

#### 4. localhost:4000/task4/:starttime/:endtime/:vehicleID

- starttime = 2012-11-30T00:00:01
- endtime = 2012-11-30T00:10:00
- vehicleID = 33298
  > expected result = {
            "result": [
                {
                    "timestamp": 1354233743000000,
                    "lon": -6.378427,
                    "lat": 53.319969
                },
                {
                    "timestamp": 1354233822000000,
                    "lon": -6.378461,
                    "lat": 53.323204
                },
                {
                    "timestamp": 1354233883000000,
                    "lon": -6.382735,
                    "lat": 53.326103
                },
                {
                    "timestamp": 1354234102000000,
                    "lon": -6.394721,
                    "lat": 53.319584
                },
                {
                    "timestamp": 1354234140000000,
                    "lon": -6.395564,
                    "lat": 53.317257
                }
            ],
            "statusCode": 200
        }

# The Challenge formulation:

The goal of this challenge is to build a web service that exposes Vehicle (Bus), Fleet (Operator), and Activity (Stop) data, for a given time frame.

The service exposes a RESTful API to answer the following questions:

1.  Given a time frame [start-time, end-time], what is the list of running operators?

2.  Given a time frame [start-time, end-time] and an Operator, what is the list of vehicle IDs?

3.  Given a time frame [start-time, end-time] and a fleet, which vehicles are at a stop?

4.  Given a time frame [start-time, end-time] and a vehicle, return the trace of that vehicle (GPS entries, ordered by timestamp).

Before implementing this exercise, you need to:

§ Choose a database management system that is more appropriate for building this web service (we value NoSQL databases, but a relational database may be also fine);

§ Choose a programming language that is type-safe and you are familiar with;

§ Choose a web toolkit that is able to handle high throughput in terms of number of requests (we are less worried about latency, but that's not to be neglected as well).

What to deliver:

· A git code repo, public or private, that can be accessed by our team, with the following:

· Instructions on how to install and/or access to the database;

· A data loader script;

· The code of the web service;

· Instructions on how to launch the HTTP service;

· Documentation and/or examples on how to use the API.

Dataset to use:

At this moment there are some issues with this dataset from Dublin but we managed to extract the files and you should be able yo find some of the data in this link:

Name: Dublin Bus GPS sample data from Dublin City Council

      URL:  https://codechallengestracc.blob.core.windows.net/code-challenge/dublin-dataset.zip

      URL: https://data.gov.ie/dataset/dublin-bus-gps-sample-data-from-dublin-city-council-insight-project

Download one extract, and from that extract, use 1 example CSV as input

# NodeJS code tech stack:

## Dev:

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [Babel](https://babeljs.io/)
- [Winston](https://www.npmjs.com/package/winston)
- [Body-parser](https://www.npmjs.com/package/body-parser)

## Testing:

- [Chai](https://www.chaijs.com/)
- [nyc](https://www.npmjs.com/package/nyc)
- [mocha](https://mochajs.org/)

## Code Quality:

- [eslint](https://eslint.org/)

## Development process & Standards:

- [TDD](https://en.wikipedia.org/wiki/Test-driven_development)
- [DDD](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)
- [REST](https://standards.rest/)

# TODOs

- Improve validations.
- Separate requests/Controllers by type.
- Improve tests:
  - Test DB should not be used and should be mocked.
  - More unhappy flows on tests.
- Improve error handling.
- Improve Swagger documentation.
- Substitute starttime and endtime parameters by query string.
  &&
- Repeat all the challenge in Java with Spring MVC.

# Made in Lisbon with ♡
