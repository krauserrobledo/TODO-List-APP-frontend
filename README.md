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


- Topics Learning.

  - Ngxs Store.
  - RxJs.
  - PrimeNG 
  - Reactive forms
  - Dialogs
  - Observables - Suscribers

- Check authentication functionality.

- Auth refactoring for architecture  improve.

- Domain: Create entities and repositories interfaces.

- Implement Task Feature:

    - Dtos, mapper,  apimodels, task-api-repository for task

    - Presentation : task Store, components.


### ***Topics Learning***

  - Clean Architecture : https://www.youtube.com/watch?v=pDgcQlPzRK4
  - Ngrx Store : https://www.youtube.com/watch?v=VGY6Raqpoc0


### ***Auth Functionallity Checking***

Responses tested with DevTools

  - Dependency Injection Issue: 
      
    Problem: NG0201 - No provider for AuthRepository
    
    Fix: Configure providers in app.config.ts

  - Error 400 - Wrong request rormat

    Problem: userName vs UserName

    Fix: DTOs and Mapper Implement

  - Error 400 - UserName already exist

    Problem: ASP.NET Identity validates unique UserName

    Fix: fixes in backend and front


### ***Auth Refactoring.***

  - Delete duplicate DTOs
  
  - Create DTOs and Response models in Data/Models.
  
  - Created AuthMappers in Base/Mappers.

  - Created Use Cases.

  - Created service for auth.

  - Using mappers and usecases in auth-service.

  - Add Mappers to Repository Implementation auth-api-implementation.

  - Added Mapper and Use Cases to providers.

  - using models and service in auth-store(not DTOs)


### ***Create entities and repositories.***

  - Created Dtos for every request and response in data/dtos.

  - Created Repository interfaces in domain/repository.

  - Created Mappers in Data/

  - Created usecases in Domain/ 


### ***Implement Task Feature.***

  - Implement task repository.
  
  - Create Service for task.

  - Create Store for Task.

  - Create Task Component.

  - Integrate Task Component in Dashboard.

  - Configure component.

----
 
## ***Weekly Sprint 11/17***

  - Add creation form to task list component.

  - Services configuration for using usecases.

  - Stores Creation for using services.

  - Implement Categories components.

  - Implement Tag Components

  - Implement Subtask components

	


  ### ***Add creation form to task list component.***

    - Separate responsabilities in task list and task form components

    - Created components for details and creation.
    
    - Created layout in dashboard for task details.
    
    - Integrate creation in list using button 
    
    - Configure cliking in task to show details for each task in details component

    - added task options in details component

    - Configured creation form to edit if selected.


  ### ***Services configuration for using usecases.***

    - created services for remaining usecases :

      - Tags usecases.

      - Categories usecases.

      - subtask usecases.

  
    - Fixed issues between repository and category use cases.


    - Repository implementation for remaining repository interfaces.

      - tag repository.

      - subtask repository.


    ### ***Stores creation for using Services***

    - created stores for using remaining services :

      - Category Store.

      - Tag Store.

      - Subtask Store.

