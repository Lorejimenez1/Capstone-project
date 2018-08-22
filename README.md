# Fortnite Comp Community

A node express app created by lorenzo jimenez

# The Motivation
Fortnite is by far the most popular video game in the world right now.The developer Epic Games are offering 100 million dollars in prize money for the eSports/competetive scene.There are already so many players making a career out of being the best at this video game.With the game growing as fast as it is comes more than 40 million people logging in everyday to play fortnite.As an avid casual and competive player i know there is a high demand to see what these professional players are using.I beleive Fortnite will continue to grow for years to come so i created an app for this community.

### How It Works
#### For Pro player settings
+	Visit Pro player settings to get the most up to date pro player peripherals like mouse keyborad and in game settings

![SettingsPage](https://github.com/Lorejimenez1/Fortnite-Society/blob/master/Public/images/Settings.png)


#### Formus page
+ You must sign up and and create an account
+ users can make a post for everyone to see
+ users can then delete any post they have made
+ Forums page assembles every post in chronological order

![ForumsPage](https://github.com/Lorejimenez1/Fortnite-Society/blob/master/Public/images/New.png)

## Technology
#### Front-End
+	HTML
+	CSS
+	JavaScript
+	jQuery

#### Back-end
+	Node.js
+	Express.js
+	Mongoose
+	MongoDB

#### Deployment, Version Control and Cloud Hosting
+	Github
+	Heroku
+	mLab

### RESTful API
#### Pro Settings endpoint
##### /pro-settings
##### GET
+	returns all Pro Player settings


#### POST
+	creates a new players settings

##### PUT
##### /pro-settings/:id
+	finds a single player and updates their settings

##### DELETE
##### /pro-settings/:id
+	Finds a single player by id and deletes them

#### Forums endpoint
##### /player-posts
##### get
+	Retreieves all user posts


##### POST
+	takes a single users post and adds it to user posts database

##### /player-posts/:id
##### DELETE
+	finds a one users post and deltes it


---

#### Users Endpoint
##### /api/users
##### POST
 +	Checks database for existing user
 +	creates a new user 

##### /api/login
##### POST
+	finds a single existing user
+ if found redirects to the profile page
---
