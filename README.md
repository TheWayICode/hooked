**Team:**

- Sean Cho: Software Developer
- Jeff Chang: Software Developer
- Robin Kim: Software Developer
- Mike Mielnicki: Software Developer

Link to our project: https://hooked2.gitlab.io/module3-project-gamma

## Design

Hooked is a informational database platform designed for fishing enthusiasts. The idealogy behind the platform is to allow avid

fishing community members to be able to log in, and find nearby fishing locations. These authentication protected endpoints on our

website, will in addition, provide guides on how to start fishing, fish found at each location, and the abiltiy to request a new

fish to be added to a specific location. As well as these features, the user will be able to post their fishing experiences to

share with other Hooked members, and be able to view other's posts. On the user profile page, is a list of posts they have shared

themselves, that they can remove from the database. The back-end of our application is built using FastAPI and the front end is

built using React and Tailwind.

## Hooked Wireframe Diagram

![Hooked Application Diagram](https://i.imgur.com/Dr1bJhZ.png)

## Hooked Landing Page and Login enhanced view
![Hooked Application Diagram Landing Page and Login enhanced](https://i.imgur.com/XhHZKQV.png)

## Hooked Forum, Guides and User Profiles Enhanced view
![Hooked Application Diagram Forum, Guides, and User Profiles enhanced](https://i.imgur.com/WxvXqXi.png)

## Hooked Search Functionality Enhanced view
![Hooked Application Diagram Search functionality enhanced](https://i.imgur.com/wE91Xfy.png)

## Clone The Repository

- In terminal verify that you are in your correct directory you would like to clone the project.
- In your terminal, ==git clone== our project. Project URL: ==https://gitlab.com/hooked2/module3-project-gamma==.
- enter the newly cloned directory.

## Starting up your Docker

- In your terminal, create a volume labelled ==hooked-data== , using the command ==docker volume create hooked-data== .
- In your terminal, create and build your docker start up with ==docker compose up --build== .
  Upon completion of this process, there will be three newly created containers in your Docker Desktop.

## Localhost resources

- The default settings to view the FastAPI Documentation, is located at ==http:localhost:8000/docs==
- The default settings to view the React-based Front end, is located at ==http:localhost:3000==
- the default port settings for the Database, is located at ==http:localhost:15432==

## Hooked Directories

Hooked contains a migrations file that will create our tables for our various components in our application. In this, you will find the tables needed for our project. These consist of the following:
==User==
==Posts==
==Fish==
=Locations==
==Location_fish==
==Fish_request==

In the queries, we used these data tables to create the various CRUD functionality necessary for our project to operate, on these tables listed above using Pydantic modeling. These then are used in our various router files, to route these to the various endpoints neccesary for operation. These are then validated in our various test files, which were used to verify that the different endpoints are getting the desired interaction with our data/tables. In addition, our authenticator file is where we set up our authentication for the project, to protect the endpoints via verified login.

## API Outline

Hooked is built with FastAPI. Using this FastAPI back-end to interact with our React based front-end,

We allow users to be able to register and login to protected endpoints that allow the user to

search fishing locations, view fish in that location, post fish requests to implement new fish in the database, search guide

redirects, get directions using a Google Maps API call, and Post/view user's fishing trips. In addition, the user can go onto

their user profile and view their user information and their posts.

## Hooked Endpoints

- ==http://localhost:3000/==: Homepage where the user is inclined to login or register their account.
- ==http://localhost:3000/login/signup== Registration form where the user is inclined to sign up for an account.
- ==http://localhost:3000/login== Login form where the user is inclined to login to their account.
- ==http://localhost:3000/searchpage== Redirect after login. Navigation bar at the top can take them to Search (this page),
  forum, profile, or to logout and return to ==http://localhost:3000/==. The search bar directs to their search based on state selection.
- ==http://localhost:3000/guides==: A page of community approved tutorials to get started with your fishing experience.
- ==http://localhost:3000/forum==: A list view of the community posts shared by community members.
- ==http://localhost:3000/forum/new==: A form submission to enter a new post in the forum.
- ==http://localhost:3000/users==: A Profile view page of the members user information and forum posts. The user can delete their own posts here.
- ==http://localhost:3000/locationlist/StateName==: The endpoint for the available fishing locations per state.
- ==http://localhost:3000/locations/LocationName==: The endpoint to get the details view of the specific location selected. Contains information about the location, as well as a Google Maps API call to redirect them to the location to provide directions.
- ==http://localhost:3000/fishreport==: A form submission to enter a new fish found at that specific location.

## FastAPI Endpoints and I/Os

## User

- Method: ==POST==, ==GET==, ==GET==, ==PUT==, ==DELETE==
- Paths: ==/api/users==, ==/api/users/{user_id}==

```
Expected Input:
{
"name": "string",
"email": "string",
"password": "string"
}
```
Expected Output:

```
{
"access_token": "string",
"token_type": "Bearer",
"account": {
"id": 1,
"name": "string",
"email": "string"
}
}
```
The purpose of the User is to get an authentication token for the user to enter our auth protected website. Entering the
user information of name, email, and password, will generate an outputted response of an access token, and the user ID associated to the user's information.

## Posts

- Method: ==POST==, ==GET==, ==GET==, ==PUT==, ==DELETE==
- Paths: ==/api/posts/==, ==/api/posts/{post_id}==

Expected Input:

```
{
"user_id": 0,
"location": "string",
"fish": "string",
"description": "string",
"picture_url": "string",
"created_at": "2023-04-25"
}

```
Expected Output:

```
{
"id": 1,
"user_id": 0,
"location": "string",
"fish": "string",
"description": "string",
"picture_url": "string",
"created_at": "2023-04-25" (Date of Creation)
}
```
The purpose of the Post is for the user to be able to share their experiences fishing with other hooked users. The
requirements of the user_id, location, fish, description, picture_url, and created_at times are all required inputs to associate
the individual post to a user, as well as share information that others can view as they interact with our front end.

## Locations

- Method: ==POST==, ==GET==, ==GET==, ==PUT==, ==DELETE==
- Paths: ==/api/locations==, ==/api/locations/{locations_id}==

Expected Input:
```
{
"name": "string",
"state": "string",
"city": "string",
"picture_url": "string",
"description": "string"
}
```

Expected Output:
```
{
"id": 1,
"name": "string",
"state": "string",
"city": "string",
"picture_url": "string",
"description": "string"
}
```
The purpose of the Locations request is for the user to be able to look up locations inside of our website. The requirements of
the name, state, city, picture_url, and description, are all required fields for the post to render. These parameters associate the inputs to a specific location ID, that the Database filters via state and city. The Output is then joined with the Fish Database, creating a Location_fish table for the fish to be connected to our Locations. This is so we can get specific locations that have unique fish associated.

## Fish

- Method: ==POST==, ==GET==, ==GET==, ==PUT==, ==DELETE==
- Paths: ==/api/fish==, ==/api/fish/{fish_id}==

Expected Input:
```
{
"name": "string",
"size": "string",
"fishing_technique": "string",
"type": "string"
}
```
Expected Output:
```
{
"id": 1,
"name": "string",
"size": "string",
"fishing_technique": "string",
"type": "string"
}
```
The purpose of the Fish endpoints is for the user to be able to see what fish are at each specific location. In addition, it associates the posts that a user can post, to be assigned to a specific fish. Upon Output, fish are linked to locations in our DB in a location_fish datatable. The name, size, fishing_technique, and type, are all required fields for the fish to be be entered into the Database. These parameters allows for unique fish to be associated to specific locations.

## FishRequest

- Method: ==POST==, ==GET==, ==GET==, ==PUT==, ==DELETE==
- Paths: ==/api/fish_requests==, ==/api/fish/{fish_request_id}==


Expected Input:
```
{
"location": "string",
"fish": "string",
"picture_url": "string"
}
```
Expected Output:
```
{
"id": 1,
"location": "string",
"fish": "string",
"picture_url": "string"
}
```

The purpose of the FishRequest endpoints is for the user to be able to create a new fish that has not be implemented in the
database yet. the location, fish, and picture_url are all required fields for the user to be able to make a fish form request. The fish request is then put into a database that an admin can review and determine if it should be implemented into the database, for that specific location.

## Intergrations

The application uses a GoogleMaps and MapBox API call to get location data. The purpose of this is to provide directions for the user to the desired fishing location.
