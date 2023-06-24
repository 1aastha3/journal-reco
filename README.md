# Journal-Hive

#### Unlocking Journal recommender for academic success and research excellence!

### Description

A recommendation engine for research papers from SPRINGER with simple and intuitive web UI.

### Tech Stack

- **Frontend**: _ReactJS, React-router-dom, Chakra-UI_
- **Backend**: _NodeJS, Express, nodeMailer_
- **Recommendation Engine**: _Python, Scikit-Learn_
- **Database**: _MongoDB_

## Frontend

Simple and intuitive web UI made using reactJS and chakra-UI with features:

- signup and login pages with jwt authentication
- displaying recommended articles
- configuring user interests by a text input and delete option
- user can rate recommended articles
- logout

## Backend

Handles user authentication, user interest configuration, mail scheduling (nodemailer, smtp) and executing python scripts

## Recommendation Engine

Uses TFIDF-based vectorization of user interests and SPRINGER API fetched articles for calculating recommendation scores.
It also cross-checks with its previously recommended articles based on the user ratings (Feedback system).

# How to run it on your local machine
- Clone the git repository in your desired directory
- Run ```npm install``` in ```web-app``` directory and ```web-app/frontend/journal-recommendation```
- Make a Mongo database on a hosting service
- Find variables and fields in the whole project directory and give MONGO_URI the link to the hosted database
- Generate json web token from jwt.io website and assign JWT_TOKEN the value
- Create a ```.env``` file in the ```web-app``` directory and store PORT, MONGO_URI and JWT_TOKEN variables with the corresponding values
- Create an account on Ethereal platform (https://ethereal.email/).
- In the file named ```jobSchedule.js``` file in the /web-app/backend/Controllers/userInterests.js/ directory, you can edit the "to" field of the mailContent object as per your requirements.
- Run ```npm run dev``` in backend and ```npm run start``` in frontend directories

# Ways to Contribute

One can contribute to this project by

- Improving the existing documentation
- Incorporating other APIs like IEEE, ArXiv, etc.
- Improving the recommendation engine by using deep learning models (like BERT).
- Improving the existing UI to make it more intuitive and deliver a better user experience.

# Scaling up/ similar innovative ideas

- making a recommendation article for platforms like Medium
- making a ranking system for QnA platforms like Quora and social media platforms like Twitter
- making a YouTube video recommendation by encoding its transcripts
