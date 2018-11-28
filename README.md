# Forgot The Milk

Forgot The Milk is a multi-user, multi-group task management and assignment application designed to be used as a personal to-do tracker, a group task management system, or a ticketing system for organizations.

**The best way to see how Forgot The Milk works is to visit the live demo site at [suzylockwood-grocerylist](https://dashboard.heroku.com/apps/suzylockwood-grocerylist)!**

## Features

* Authentication and authorization capabilities
* Public-facing and private lists
* Updates synced across users and devices
* List items can be marked and unmarked as purchased 
* User groups for lists *(work in progress)*
* Assigned tasks *(work in progress)*
* Search *(work in progress)*
* Task prioritization *(work in progress)*

## Built With

* [HTML5](https://www.w3.org/TR/html5/) - Markup language
* [JavaScript](https://www.javascript.com/) - Programming language
* [CSS3](https://www.w3.org/TR/css-2018/) - Style sheet language
* [Node](https://nodejs.org/en/) - Runtime environment
* [Express](https://expressjs.com/) - The web framework used
* [PostgreSQL](https://www.postgresql.org/) - Database backend
* [Sequelize](http://docs.sequelizejs.com/) - ORM 
* [EJS](https://ejs.co/) - View engine
* [Bulma](https://bulma.io) - The Frontend/CSS framework used -- my first time using it instead of Bootstrap!
* [Jasmine](https://jasmine.github.io/) - Testing framework

## Technical Decisions 

#### Problem:  
```
Shared Real-time Grocery List
Create a grocery list web-application that can be shared in real-time by multiple people.
Imagine you have a 4-person family, and each of you has a smart-phone with the web application running. 
When you arrive at the grocery store, you split up to shop individually. 
This allows the groceries to be acquired in the fastest possible way. 
Each person has the same grocery list on their phone. 
When one of you checks a grocery item off the shared list, it updates on everyone else’s list, 
preventing anyone from purchasing duplicate items. 
Similarly, items added to the list on any phone update to the same list.
```

#### Solution: 
Application that allows real-time updates across devices. 

I used Node for three main reasons: 
* It was designed to optimize throughput and scalability in web applications and is a good solution for many common web-development problems (e.g. real-time web applications). 
* The code itself is written in "plain old JavaScript", which means that less time is spent dealing with "context shift" between languages when I'm writing both client-side and server-side code. As a new developer, I appreciate this even more as it allows me to focus on developing the application as opposed to learning the nuances between two languages. 
* Node offers a great package manager, npm, and the amount of available open-source tools in npm’s registry is massive and growing fast.

Source: [Express/Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)


#### To do with more time:
* Implement some of the outstanding pages (About, Contact Us, Report Issue) and features (some of which are mentioned in features section). 
* Add even more tests. 
* Better error messaging, some edge cases not considered. 
* Solve the issue of users being able to add duplicate items to list which can conflict with intention for users not to purchase duplicate items. Perhaps with an "are you sure" error message or denying altogether. 
* Improve UI attractiveness, flow and consistency further.  

## Screenshots
* Home Page 
![forgot the milk home](https://user-images.githubusercontent.com/40550878/48399391-58af2d80-e6d8-11e8-87fe-2e5296fabd76.PNG)

* Example List
![list](https://user-images.githubusercontent.com/40550878/48399396-5baa1e00-e6d8-11e8-957b-36869aa0ba8e.PNG)

