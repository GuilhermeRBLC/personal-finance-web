# Personal Finance Web 📊

Modern web interface for the personal finance management system, developed with Angular. The application asynchronously consumes a RESTful API and securely manages the authentication state.

## 🚀 Technologies Used

* **Angular** (Recent version using standalone components)
* **TypeScript**
* **RxJS** (Reactive programming for handling data streams)
* **TailwindCSS / Bootstrap** (Replace with the styling framework you used)

## 🔑 Frontend Technical Highlights

* **Functional HttpInterceptor:** A global interceptor intercepts all HTTP requests sent to the API, retrieves the JWT token stored in `localStorage`, and automatically injects the `Authorization: Bearer <TOKEN>` header into every request.
* **Decoupled Architecture:** The frontend is completely independent of database rules, communicating strictly through the contracts (DTOs) exposed by the backend.