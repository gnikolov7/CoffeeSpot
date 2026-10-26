# CoffeeSpot

CoffeeSpot is a React application for discovering restaurants, cafes, bakeries and bars.

Users can browse places, search and filter them, view ratings and reviews, and open a details page for each place.

Registered users can also add places and leave reviews.

## Live Application

https://coffee-spot-three.vercel.app/

## Technologies

- React
- React Router
- JavaScript
- Vite
- Supabase
- CSS
- Git
- GitHub
- Vercel

---

# Functional Guide

## 1. Project Overview

**Application Name:** CoffeeSpot

**Application Category / Topic:** Place discovery and review platform

**Main Purpose:**

CoffeeSpot helps users discover restaurants, cafes, bakeries and bars.

Visitors can browse places and read reviews, while registered users can add new places and share their own ratings and opinions.

---

## 2. User Access & Permissions

### Guest (Not Authenticated)

Guests can access:

- Home page
- Places catalog
- Place details
- Login
- Register

Guests can see public information about places, ratings and reviews.

Guests cannot:

- Add places
- Edit places
- Delete places
- Add reviews
- Edit reviews
- Delete reviews
- Open My Places

### Authenticated User

Logged-in users can access the public pages and also:

- Add a new place
- Open My Places
- Write reviews
- Edit their own reviews
- Delete their own reviews
- Edit places they created
- Delete places they created
- Logout

Only the author of a place can edit or delete it.

Only the author of a review can edit or delete it.

---

## 3. Authentication & Session Handling

### Authentication Flow

Authentication is handled with Supabase Authentication.

When the application loads, `AuthContext` checks if a Supabase session already exists.

If a user is logged in, the user information is stored in the authentication context and becomes available to the rest of the application.

During login, the email and password are sent to Supabase.

During registration, a new Supabase user is created with an email, password and username.

When the user logs out, the Supabase session is cleared and the application returns to guest mode.

### Session Persistence

The application uses the Supabase authentication session together with React Context.

`AuthContext` loads the current session when the application starts and listens for authentication changes.

Because of this, a logged-in user stays recognized after refreshing the page.

---

## 4. Routing Structure

The application uses React Router for client-side routing.

### Main Routes

```text
/                         Home
/places                   Places catalog
/places/:placeId          Place details
/places/new               Add place
/places/:placeId/edit     Edit place
/my-places                My places
/login                    Login
/register                 Register
```

There is also a Not Found page for invalid routes.

### Route Guards Logic

`ProtectedRoute` is used for pages that require authentication.

Guests trying to access a protected page are redirected to Login.

`GuestRoute` is used for Login and Register.

If an authenticated user tries to open Login or Register, the user is redirected back to the application.

### Parameterized Routes

The application uses URL parameters in:

```text
/places/:placeId
/places/:placeId/edit
```

The `placeId` parameter is used to load the correct place from Supabase.

---

## 5. List → Details Flow

### Catalog / List Page

The catalog is available at:

```text
/places
```

It loads places from Supabase.

Each place is shown as a card with information such as:

- Name
- Category
- City
- Image
- Rating
- Number of reviews

The user can:

- Search places
- Filter by category
- Sort by newest
- Sort by rating

The available categories are:

- Restaurants
- Cafes
- Bakeries
- Bars

A category selected from the Home page can also be stored in the URL.

Example:

```text
/places?category=Cafe
```

### Details Page

Clicking a place card opens:

```text
/places/:placeId
```

The place ID is received from the route parameter.

The details page loads the selected place and its reviews from Supabase.

It displays:

- Place name
- Category
- City
- Address
- Description
- Image
- Average rating
- Review count
- Reviews

React Router `Link` components are used for navigation, while `useNavigate` is used when navigation is needed after actions such as creating, editing or deleting data.

---

## 6. Data Source & Backend

CoffeeSpot uses Supabase as a Backend-as-a-Service.

Supabase provides:

- PostgreSQL database
- Authentication
- Persistent remote data
- Row Level Security

The main tables used by the application are:

### places

Stores place information.

Important fields include:

- id
- owner_id
- name
- description
- category
- city
- address
- image_url
- created_at

### reviews

Stores user reviews.

Important fields include:

- id
- place_id
- user_id
- rating
- comment
- created_at

### profiles

Stores public user information such as username.

The application communicates with Supabase through the Supabase JavaScript client.

---

## 7. Data Operations (CRUD)

The main CRUD collection is `places`.

### Create

A logged-in user can open:

```text
/places/new
```

The user fills in the place form and submits it.

The application sends the data to Supabase and creates a new record in the `places` table.

The current user becomes the owner of the new place.

### Read

Places are loaded from Supabase and displayed in:

```text
/places
```

A single place is loaded by ID on:

```text
/places/:placeId
```

My Places loads only the places owned by the current authenticated user.

### Update

The owner of a place can open:

```text
/places/:placeId/edit
```

The form loads the existing data.

After submitting the edited form, the record is updated in Supabase.

The user is then returned to the details page.

### Delete

The owner can delete a place from the details page.

The application asks for confirmation before deletion.

After successful deletion, the user is redirected to the places catalog.

Supabase Row Level Security is also used to make sure users cannot edit or delete records owned by another user.

### Reviews

Reviews also use remote data operations.

Logged-in users can:

- Create a review
- Read existing reviews
- Edit their own review
- Delete their own review

A user can leave only one review for the same place.

---

## 8. Forms & Validation

### Forms Used

The application contains forms for:

- Register
- Login
- Add Place
- Edit Place
- Add Review
- Edit Review

The forms use controlled React inputs.

### Validation Rules

Examples of validation include:

**Username**

The username must contain at least 2 characters.

**Password**

The password is required and must meet the minimum length used by the application.

**Place name**

A place must have a name.

**Place description**

The description is required and must contain enough information before the form can be submitted.

**City**

The city is required.

**Review**

A review comment must contain at least 5 characters.

**Rating**

A rating must be between 1 and 5.

Validation errors are displayed in the interface instead of allowing invalid data to crash the application.

---

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

The application uses React hooks including:

- `useState`
- `useEffect`
- `useContext`
- `useParams`
- `useNavigate`
- `useSearchParams`

A custom `useAuth` hook is also used to access authentication data.

`useEffect` is used to load remote data when pages mount.

For example, the Catalog page loads places when the component is opened.

Some effects use an `isActive` variable and a cleanup function.

When the component unmounts, `isActive` becomes false so the component does not try to update state after it is no longer active.

This demonstrates mount and unmount behavior.

Effects also react to changing values such as route parameters and search parameters.

### Context API

`AuthContext` shares authentication information across the application.

It contains information such as:

- Current user
- Current session
- Authentication loading state
- Login function
- Register function
- Logout function

Components access the context through the `useAuth` custom hook.

### Component Styling

The application uses an external CSS file:

```text
src/styles/global.css
```

The same visual style is reused across pages and components.

---

## 10. Typical User Flow

A typical user journey can be:

1. The user opens CoffeeSpot and browses featured places.
2. The user opens Explore and searches or filters the catalog.
3. The user opens the details page of a place and reads its reviews.
4. The user registers or logs in.
5. The logged-in user adds a new place or leaves a review.
6. The user can later edit or delete their own content.
7. The user logs out.

---

## 11. Error & Edge Case Handling

### Authentication Errors

Errors returned during Login or Register are caught and shown to the user.

Private pages are protected by route guards.

### Network or Data Errors

Supabase requests are wrapped in error handling.

Pages use loading and error states while remote data is being requested.

If a request fails, an error message is displayed instead of crashing the application.

### Empty or Missing Data

The application includes empty states for situations such as:

- No places available
- No search results
- No reviews
- No user-owned places

If a place cannot be loaded, the application displays an error state.

Unknown routes display the Not Found page.

---

# Project Structure

```text
src/
├── components/
├── contexts/
├── hooks/
├── lib/
├── pages/
├── services/
├── styles/
├── App.jsx
└── main.jsx
```

The project separates reusable UI components, pages, authentication logic and Supabase service functions.

---

# Installation

Clone the repository:

```bash
git clone https://github.com/gnikolov7/CoffeeSpot.git
```

Open the project:

```bash
cd CoffeeSpot
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root.

Add:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Start the development server:

```bash
npm run dev
```

The application will normally run at:

```text
http://localhost:5173
```

---

# Production Build

Run:

```bash
npm run build
```

The production files are generated inside the `dist` folder.

---

# Deployment

The frontend is deployed with Vercel.

Live application:

https://coffee-spot-three.vercel.app/

Supabase is used as the hosted backend and database service.

---

# Repository

https://github.com/gnikolov7/CoffeeSpot

---

# Author

Georgi Nikolov

SoftUni React Project - 2026

