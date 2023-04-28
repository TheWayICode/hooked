# Sean's Journal

**Prior to 3/28/2023**
The entire group threw around application suggestions before deciding on Hooked. We then made a mockup of what our application would look like through excalidraw. During this process, we detailed our project MVP as well as any stretch goals.

**3/28/2023**
We started with discussing the endpoints required in the backend as well as the database we would use for this application. After settling on PostgreSQL, we got to work on starting the queries and routers.

**3/29/2023**
The team tackled the multiple endpoints necessary by having each member assigned to an equal amount of them. We started with the group of user endpoints with me getting the "get one user" endpoint functioning.

**3/30/2023**
Today, the team worked on and completed the location endpoints with me being assigned to the delete location endpoint.

**3/31/2023**
The team tackled the fish endpoints today and I was able to finish getting the put fish endpoint to function. We began discussing the implementation of back-end authentication with the jwtdown library we were provided.

**4/03/2023**
The team worked on token protection for the user endpoints.
I was assigned to implementing authentication for the get all user endpoint.

**4/04/2023**
We as a team finished protecting all the endpoints for post. I finished working on authentication protection for update post.

**4/05/2023**
As a team, we discussed the way to link the fish database to the location database. We decided to create an intermediary table that acted as the link to reference data from the fish table for the location details.

**4/06/2023**
Today we installed tailwind in our application as our styling library. Our starting point for the front end focused on creating the login and signup pages as well as authentication to go with it.

**4/07/2023**
Each team member today was assgined a different part of the front end application to work on. I decided on the location detail pages and got to work on creating the base look for the pages.

**4/11/2023**
Today I worked more on making the location detail pages more stylish as well as come up with some details for hard coded locations for the application to display. The team managed to get the home page up and running.

**4/13/2023**
Today I got to work on making sure that the fetch requests to the backend location endpoint was properly getting the data to be displayed.

**4/14/2023**
I was able to complete the link between the backend and the frontend and got all of the necessary data from the location endpoint to show on react page.

**4/17/2023**
Today we ran into issues in getting a single authenticated user from their token. This is becoming somewhat of a blocker so we will most likely continue working on it tomorrow.

**4/18/2023**
We were able to figure out to get a single user's information from their token. I worked on implementing a custom invalid login alert for login attempts with invalid credentials.

**4/19/2023**
As a team, we tackled deployment today but became stuck on part 3 of the deployment instructions. I am also running into an error in which the token from the jwtdown library is not being assigned fast enough for the redirect to occur before the invalid login alerts.

**4/20/2023**
Continued deployment work but are still stuck on parts 3-4. May need an instructor to help out. Jeff created a workaround for the login issue.

**4/24/2023**
Today the team was able to get deployment completed with no discernible errors as of now. Robin is running into an issue where his local device cannot view the deployed website properly.

**4/25/2023**
Cleaned up code to make sure there were no bugs in the deployed website. We changed our hrefs to Links to properly show on our deployed website. The team is trying to make the third party API key dynamic rather than having to hard code it in, but we are struggling to get it to work.

**4/26/2023**
We were able to fix the dynamic api key issue and got it to work on the deployed site. I worked on an about us page for the group members to be displayed.

**4/27/2023**
Fixed a bug where the front end was making fetch calls to protected endpoints but were not receiving data because of a lack of credentials.
