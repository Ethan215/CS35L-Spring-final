# Finduo

Finduo is a web application designed to help gamers in finding their ideal duo partners across a variety of games, enhancing their gaming experience.

## Features

- **View and Create Profiles:** Users can customize their profiles, linking their gaming accounts and specifying their gaming preferences and availability.
- **Meaningful Search:** Users can search for teammates based on specific criteria such as game, skill level, playstyle (casual/competitive), interests, and availability. Advanced filters will allow for precise teammate searches.
- **Friend System:** Users can send friend requests, create a friends list, and view mutual friends. This promotes a more connected gaming community.
- **Messaging and Invites:** Users can send messages and game invites to potential teammates, facilitating easy communication and coordination for gaming sessions.
- **User Authentication and Security:** Secure login mechanisms will ensure user data privacy and security. Authentication will be required for profile customization and accessing friend lists.

## Setup

1. Clone the repository
    ```
    git clone https://github.com/your-username/game-duos-finder.git
   ```
2. Setup dependencies

    To setup dependencies for the backend, run the following commands:
    ```
    cd backend
    npm install
    ```
    To setup dependencies for the frontend, run the following commands:
    ```
    cd frontend
    npm install
    ```
3. Set up environment variables

    Create a `.env` file in the `backend` directory:
    ```
    PORT=4000

    # MONGO_URI not included, you'll need to put your own 
    MONGO_URI=

    # Replace this with your generated secret key
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


## Technologies

We used a MERN (MongoDB, Express, React, Node) stack with Typescript and Vite. 
