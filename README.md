# Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Setup](#setup)
    - [Cloning the Repository]
    - [Setting up Dependencies]
    - [Setting up Environment Variables]
    - [Running the Application]
4. [Technologies](#technologies)
5. [Authors](#authors)

--------

## Introduction <a name="introduction"></a>

A social platform for gamers.
Finduo is a web application designed to help gamers in finding their ideal duo partners across a variety of games, enhancing their gaming experience.

## Features <a name="features"></a>

- **View and Create Profiles:** Users can create a detailed profile to help them find their ideal duo. They can specify their region, create a custom bio, and detail a list of games alongside their rank, and tags that specify further preferences (Competitive/Casual, In-game role, etc)
- **Meaningful Search:** Users can search for teammates based on specific criteria such as game, skill level, playstyle (casual/competitive), interests, and availability. Advanced filters will allow for precise teammate searches.
- **User Authentication and Security:** Secure login mechanisms will ensure user data privacy and security. Authentication will be required for profile customization, sending messages, liking profiles, and accessing friend lists. In general, users must first log in to view most content on the site.

- **Friend System:** Users can send friend requests and view their friends list, allowing users to connect easily with each other.
- **Messaging and Invites:** Users can send messages and game invites to potential teammates, facilitating easy communication and coordination for gaming sessions.
- **Stars:** To support a positive and respectful community, users can star other users and keep track of users that they like. Authentication is used to prevent users from starring and unstarring profiles multiple times. Profiles will display a star count so users can identify reputable members of the community.
- **Posts and Comments:** Users can create public posts that are visible to all such as a public game invite. Users can view a feed of these posts and leave comments on them for discussion. 

## Setup <a name="setup"></a>

1. Clone the repository
    ```
    git clone https://github.com/Ethan215/CS35L-Spring-final.git
   ```
    If you have a tarball of the repository, decompress it instead.
2. Setup dependencies

    To setup dependencies for the backend, run the following commands (from the project's root directory):
    ```
    cd backend
    npm install
    ```
    To setup dependencies for the frontend, run the following commands (from the project's root directory):
    ```
    cd frontend
    npm install
    ```
3. Set up environment variables

    Create a `.env` file in the `backend` directory:
    ```
    PORT=4000

    # Replace this with the MONGO_URI from Atlas 
    MONGO_URI=

    # Replace this with the generated secret key
    SECRET_KEY=
    ```

4. Running the application

    To start the backend, make sure you are in the backend directory and run:
    ```
    npm run start
    ```
    To start the frontend, make sure you are in the frontend directory and run:
    ``` 
    npm run dev
    ```
    
5. **Additional Note for Safari Users**


    Ignore this if using Chrome, etc
    
    Safari has some known issues with dealing with accepting cookies which has been known to break the functionality of websites.
    Safari, by default, is strict about blocking all cookies and has certain other barriers against cookies.
    The JWT token is sent over a secure HTTP-only cookie which should normally be set by the browser for authentication.
    Although Safari can receive the JWT cookie and receive the Set-Cookie header, some default settings may interfere with storing this cookie and therefore auth.
    It is therefore recommended to use Chrome instead.

## Technologies <a name="technologies"></a>

We used a MERN (MongoDB, Express, React, Node) stack with Typescript and Vite. 

## Authors <a name="authors"></a>

Finduo was made as a project for CS 35L taught by Professor Paul Eggert at UCLA in Spring 2024. Made by: Leon Liu, BingHong Ni, Madison Ell, Gary He, Mirjana Vujovich and Huu Nhan Nguyen.
