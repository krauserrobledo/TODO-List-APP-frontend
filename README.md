# ***TODOListApp Frontend Project***

## ***WEEKLY SPRINT 11/03***

#### ***Initialize Angular project:***

- start new project :

  - ng new frontend.


- Install angular/material :

  - ng add @angular/material


- Configure environments :

  - Created Environments new folder.
    
  - Created Environment.js class.


### ***Frontend clean arch learning:***

  - https://medium.com/taager-tech-blog/clean-architecture-for-angular-applications-b7ab140f0d5a
  
  - https://gitlab.com/taager-com/examples/-/tree/main/clean-architecture-angular/src/base
  
  - https://www.youtube.com/watch?v=LswOKQAulfM&list=LL&index=2 


### ***Set project structure:***

 - app
    
 - Base
    - guards
    - interceptors
    - services
 
 - Data
     - repositories
         - user
    
 - Environments
 
 - Domain
    - models
    - repositories
    - usecases
 
 - Presentation
     - assets
     - components
     - pages
     - stores

### ***Create Auth Module.***

  - Domain Layer:

    - Entities:  User, Auth.
    - Repositories : auth-repository, user-repository.
    - Use Cases:  Login, Register, Get User.


  - Data Layer:

    - Response Models : user, api.
    - Repositories Implementation : auth-api-repository, user repository.

  - Presentation:

    - pages : login register.
    - Stores: auth store.

## ***WEEKLY SPRINT 11/10***


- Topics Learning

- Auth refactoring for architecture  improve

- Check authentication functionality.

- Domain: Create entities and repositories interfaces.

- Implement Task Feature:

    - Data : Dtos, mapper,  apimodels, task-api-repository for task

    - Presentation : task Store, components.





