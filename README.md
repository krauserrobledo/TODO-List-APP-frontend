# **TODOListApp — Frontend**

**TODOListApp** is a modular, scalable task‑management application built with **Angular 20**, later upgraded to **Angular 21**, following a strict **Clean Architecture** approach.  
It uses **NGXS** for predictable state management, **PrimeNG** for enterprise‑grade UI components, and **TailwindCSS** for modern styling.

The application is designed to be maintainable, testable, and extensible — suitable for real‑world production environments.

---

# **Tech Stack**

| Layer | Technology |
|-------|------------|
| Framework | **Angular 20 → upgraded to Angular 21** |
| UI Library | **PrimeNG + PrimeUIX Themes** |
| Styling | **TailwindCSS** |
| State Management | **NGXS** |
| Architecture | **Clean Architecture** |
| Forms | **Reactive Forms** |
| Language | **TypeScript (strict mode)** |
| Build | Angular CLI |

---

# **Architecture Overview**

The project follows a **Clean Architecture** structure to ensure separation of concerns and long‑term maintainability.

```
src/
│
├── Base/               # Cross-cutting concerns (services, guards, interceptors, mappers)
├── Data/               # DTOs, API models, repository implementations
├── Domain/             # Entities, repository interfaces, use cases
├── Presentation/       # Components, pages, stores, UI logic
├── Environments/       # Environment configuration
└── app/                # App bootstrap
```

### **Layer Responsibilities**

#### **Domain Layer**
- Pure business logic  
- Entities, repository interfaces, use cases  
- No Angular dependencies  

#### **Data Layer**
- DTOs  
- API response models  
- Repository implementations  
- Mappers between DTOs ↔ Domain models  

#### **Base Layer**
- Shared services  
- Interceptors  
- Guards  
- Utility mappers  

#### **Presentation Layer**
- Angular components  
- Pages  
- NGXS stores  
- UI logic  

---

# **Key Features**

### Authentication
- Login / Register  
- NGXS Auth Store  
- DTO mapping and domain‑driven use cases  

### Task Management
- Create, edit, delete tasks  
- Task details panel  
- Subtasks  
- Tags  
- Categories  
- Status updates  

### Dashboard
- Modular layout  
- PrimeNG panels  
- TailwindCSS styling  
- Glassmorphism UI  

### Advanced Filtering
- **Calendar with task highlighting**  
- **Date filtering**  
- **Status filtering**  
- **Combined filtering (date + status)**  

### UI/UX
- PrimeNG components  
- TailwindCSS utility classes  
- Responsive layout  
- Dialog‑based forms  
- Smooth interactions  

---

# **State Management (NGXS)**

The application uses NGXS for predictable, scalable state management.

Stores implemented:

- **AuthStore**
- **TaskStore**
- **CategoryStore**
- **TagStore**
- **SubtaskStore**

Each store:
- Uses domain use cases  
- Maps DTOs to domain models  
- Handles async operations with Observables  
- Emits UI‑friendly state slices  

---

# **UI Technology**

### **PrimeNG**
Used for:
- Buttons  
- Panels  
- Dialogs  
- Listboxes  
- Datepicker  
- Cards  
- Inputs  

### **TailwindCSS**
Used for:
- Layout  
- Spacing  
- Typography  
- Glassmorphism  
- Responsive design  

The combination gives a **clean, modern, enterprise‑grade UI**.

---

# **Installation & Setup**

```bash
npm install
npm start
```

Build:

```bash
npm run build
```

---

