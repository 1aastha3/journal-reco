# Journal-Hive

#### Unlocking Journal recommender for academic success and research excellence!

### Description

A recommendation engine for research papers from SPRINGER with a simple and intuitive web UI. A feedback system is incorporated through user ratings to improve the accuracy and relevance of the recommended articles. Integration of machine learning algorithms, API endpoints, and front end is efficient to ensure a smooth user experience.

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

# How to run it on your local machine after downloading them as a zip file in your desired directory

- Run `npm install` in `web-app` directory and `web-app/frontend/journal-recommendation` directories.

- Run `pip install -r requirements.txt` in `/web-app` directory to install required python libraries.

- Create an account on the Ethereal platform (https://ethereal.email/).

- The ethereal platform will provide a "user" and a "pass" credential. Replace these with "user" and "pass" fields inside the "transporter" object of the file named `jobSchedule.js` inside the `/web-app/backend/jobSchedule.js` directory.

- Run `npm run dev` in `web-app/backend` and `npm start` in `web-app/frontend/journal-recommendation`

- The new recomendations in the "my recommendation" modal will be rendered upon clicking the button only.

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
