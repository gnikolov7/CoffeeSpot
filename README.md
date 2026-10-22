# CoffeeSpot

CoffeeSpot is a React application for discovering restaurants, cafes, bakeries and bars.

Users can browse places, search and filter them, see ratings and reviews, and open a details page for every place.

Registered users can also add their own places and write reviews.

## Technologies

- React
- React Router
- JavaScript
- Vite
- Supabase
- CSS
- Git / GitHub

## Main Features

### Guests

Guests can:

- View all places
- Search places
- Filter by category
- Sort by newest or top rated
- View place details
- Read reviews
- Register
- Login

### Logged-in Users

Logged-in users can also:

- Add a new place
- View their own places
- Edit their own places
- Delete their own places
- Add a review
- Edit their own review
- Delete their own review
- Logout

## Authentication

Authentication is handled with Supabase.

The application supports:

- Register
- Login
- Logout
- Persistent user session

The current user is stored and shared through React Context.

## Database

The project uses Supabase as a backend service.

The main tables are:

### places

Stores information about every place.

Some of the fields are:

- name
- description
- category
- city
- address
- image
- owner
- created date

### reviews

Stores:

- place
- user
- rating
- comment
- created date

Each user can leave one review for a place.

### profiles

Stores the username connected to every registered user.

## Routes

```text
/                         Home page
/places                   Catalog
/places/:placeId          Place details
/places/new               Add place
/places/:placeId/edit     Edit place
/my-places                My places
/login                    Login
/register                 Register
```

Private pages are protected with route guards.

Guests cannot open private pages.

Logged-in users cannot open the Login and Register pages.

---

# Functional Guide

## Home Page

The home page contains the main categories and featured places.

The user can open the full catalog or choose a category such as:

- Restaurants
- Cafes
- Bakeries
- Bars

Choosing a category opens the catalog with the selected filter.

## Catalog

The catalog is available at:

```text
/places
```

The user can:

- Search places
- Filter by category
- Sort by newest
- Sort by rating
- Open the details page of a place

## Place Details

The details page is available at:

```text
/places/:placeId
```

It shows information about the place and its reviews.

Guests can read reviews.

Logged-in users can also write a review.

## Register

A new user can register from:

```text
/register
```

The registration form contains:

- Username
- Email
- Password

## Login

Existing users can login from:

```text
/login
```

After successful login, private functionality becomes available.

## Add Place

Logged-in users can add a place from:

```text
/places/new
```

The form contains information such as:

- Name
- Description
- Category
- City
- Address
- Image URL

## My Places

Logged-in users can open:

```text
/my-places
```

This page shows the places created by the current user.

## Edit Place

Only the owner of a place can edit it.

The edit route is:

```text
/places/:placeId/edit
```

## Delete Place

Only the owner can delete a place.

The application asks for confirmation before deletion.

## Reviews

Logged-in users can leave a rating and comment.

Users can also edit or delete their own reviews.

The average rating of a place is calculated from its reviews.

---

## Project Structure

The project is separated into:

```text
components/
pages/
services/
contexts/
hooks/
lib/
styles/
```

Reusable UI elements are kept inside `components`.

Pages are kept inside `pages`.

Supabase requests are separated inside `services`.

Authentication state is handled with `AuthContext`.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/gnikolov7/CoffeeSpot.git
```

Open the project:

```bash
cd CoffeeSpot
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

Start the application:

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Deployment

Live URL will be added after deployment.

## Author

Georgi Nikolov

SoftUni React Project - 2026
