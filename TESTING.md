# Testing For Frontend React Appy-Families

## Contents
1. [Manual](#manual)
2. [Validation](#validation)
3. [Lighthouse](#lighthouse)
4. [User Stories](#user-stories)
    1. [Navigation and authentication](#navigation-and-authentication)
    2. [Memo page](#memo-page)
    3. [Todo page](#todo-page)
    4. [Achievements](#achievements)
    5. [Profiles](#profiles)
    6. [User experience](#user-experience)

### Manual

- Manual testing were carried out for the URL paths, search functionality and **CRUD** functionality, all were made into tables and checked off.

### URL Path tests

![URL path tests development](./documents/testing/front-dev-url-test.png)

### Search testing

![search table for development](./documents/testing/search-dev-test.png)

### CRUD Testing
- Table was made to check a user could **C**reate, **R**ead, **U**pdate, or **D**elete items.
- The table for deployed was testing in the back link to the front end [here](https://github.com/Mrst12/pp5-backend-drf-appy-families/blob/main/TESTING.md)
- I used a key in the table 
    - LI meaning the user was logged in, and so could Create, and read.
    - LO meaning the user was not logged in and so could only read.
    - LI/O meaning the user was logged in **and** the owner so had full CRUD functionality.

![CRUD testing development](./documents/testing/front-crud-test-dev.png)

### Validation
### Lighthouse
### User Stories
#### Navigation and authentication

- As a User I can access a navigation menu so that I can easily get between pages
- As a user I can navigate through pages quickly so that I can view content without having to refresh the page
- As a user I can register for an account so that I can access all content
- As a user I can log in to the site so that I can access all content for a logged in user
- As a user I can see if I am logged in or logged out so that I can log in or out as needed
- As a user I can maintain my logged in status until I choose to log out so that my user experience is not compromised
- As a logged out user I can see sign in or register options so that I can sign in or register
- As a user I can view other users avatars so that I can easily identify users of the site

#### Memo page

- As a user I can create a memo so that it can be viewed on the memo page
- As a memo owner I can update my memo so that I can change the message as necessary after creation
- As a memo owner I can delete my memo so that I can control the removal of the memo from the site
- As a user I can search memo posts by profile name, content or who it is for so that I don't have to look through every memo
- As a user I can like a memo so that other users can see my interaction with their memos
- As a user I can comment on memo posts so that I can interact with the site
- As a user I can view memos so that I can see everything that is going on within my family

#### Todo page

- As a user I can create an item in the todo page so that I can see what tasks need to be done
- As a user I can view the Todo details so that I know all the details for the item
- As a owner user I can update my todo list so that I have full functionality over the list
- As a owner user I can delete a todo item so that I am in control of my lists
- As a user I can search the todo list page by owner profile, task title, status, or due date so that I have more control over which posts I see

#### Achievements

- As a user I can create an achievement post so that everyone can share my achievements
- As a user I can view all the achievements posted so that I can see what everyone is doing in my family
- As a owner user I can update my achievement post so that I can make any necessary changes after creation
- As a owner user I can delete my achievement so that I have full control of my post
- As a user I can comment on achievement posts so that I can interact with the other users
- As a user I can like a users achievement so that I can interact with other users showing I like their post

#### Profiles

- As a user I can create my own profile so that others can see information about me
- As a user I can update my profile so that the information about me is up to date
- As a user I can view the profile pages of users so that I can get to know more information about them
- As a user I can update my username and password so that I can keep my profile secure

#### User experience

- As a user I can view an about page so that I can see what the site is about
- As a user I can keep scrolling through posts that are loaded automatically so that I don't have to click next page to see other posts
- As a user I can easily use the site so that I want to keep returning