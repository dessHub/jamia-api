# JAMIA MOSQUE PLATFORM

# Endpoints

## Mobile Client

   1. GET  /api/articles:category
   2. GET  /api/tv-stream
   3. GET /api/calendar 

## Admin 

   1. GET /admin/
   2. GET /admin/articles
   3. POST /admin/articles/create
   4. GET /admin/article:id
   5. GET /admin/article/update:id
   6. POST /admin/article/update
   7. GET  /admin/article/remove:id
   8. GET /admin/users
   9. GET /auth/login
   10. POST /auth/login
   11. GET /auth/signup
   12. POST /auth/signup

## Dependencies include: 
  * MongoDB
  * Express JS
  * NODE JS
  
  ## Installation
  
  Clone the repository and install dependencies with npm install:
  
     git clone https://github.com/dessHub/jamia-api.git
     npm install
     
 ## Set Up
 
  Copy .env-example to .env file and update with your your variables
  
## Starting the server

      npm start
    
    
# Contribution 

   If you will like to contribute to this project , you should follow the following github best practices.
   ### Steps
   1. Fork the project to your github account .
   2. Clone to your local machine.
   `git clone https://github.com/<your-username>/jamia-api.git`
   3. Inside project directory change to `develop` branch.
   `git checkout develop`
   4. Create a new branch from develop branch following below github best practices.
   `git checkout ft-admin-dashboard`
   5. Push the your github account and create `pull request` to this repository `develop` branch.
   
# Github Best Practices    

### Branch Naming

Branches created should be named using the following format:

```
{story type}-{2-3 word summary}-{pivotal tracker id}
```

`story-type` - Indicates the context of the branch and should be one of:

- ft == Feature
- bg == Bug
- ch == Chore

`story-summary` - Short 2-3 words summary about what the branch contains

**Example**

```
ft-resources-rest-endpoints-111504508
```

### PR Naming

The PR title should be named using the following format:

```
#[STORY_ID] Story description
```

**Example**

```
#111504508 Build out REST Endpoints for Resources (CRUD)
```

### PR Description Template (Markdown)

The description of the PR should contain the following headings and corresponding content in Markdown format.

```md
#### What does this PR do?
#### Description of Task to be completed?
#### How should this be manually tested?
#### Any background context you want to provide?
#### What are the relevant pivotal tracker stories?
#### Screenshots (if appropriate)
#### Questions:
```

**Example**

![](https://github.com/andela/bestpractices/raw/master/img/git-naming.png)

### Commits

Atomic commits should be made with the format:

```
[story-type #[pivotal-tracker-id]] Description of task that has been implemented.
```

`story-type` - Indicates the context of the branch. Should be one of:

- Feature
- Bug
- Chore

**Example**

```
[Feature #111504652] Add status code assertion in tests
```




