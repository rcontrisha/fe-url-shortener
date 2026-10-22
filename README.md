# ShortLink

ShortLink is a modern URL shortener web app built with React + Vite. This frontend allows users to register, log in, create custom short links, manage existing links, and monitor their dashboard in a clean and responsive interface.

## Project Description

This project is a frontend client for a URL shortening service. It lets users:

- Sign up and log in to an account
- Create shortened URLs from long destinations
- Use custom slugs for cleaner short links
- View all created links in a dashboard
- Search, paginate, and delete links
- Manage authentication state with Redux

## Tech Stack

- React 19
- Vite
- React Router
- Redux Toolkit
- Redux Persist
- React Hook Form
- Tailwind CSS
- React Icons
- ESLint

## Features

### Authentication
- Login page
- Register page
- Persistent auth token handling
- Protected dashboard flow

### Link Management
- Create short links
- Optional custom slug
- Live preview of the generated short URL
- Search links by keyword
- Pagination support
- Delete short links

### Dashboard
- Show total active links
- Display created short URLs
- List original destination URLs
- Display click count and creation date

## Project Structure

```text
src/
  App.jsx
  main.jsx
  index.css
  components/
    LinkItem.jsx
    shared/
      Footer.jsx
      Navbar.jsx
  pages/
    Index.jsx
    Dashboard.jsx
    CreateLink.jsx
    NotFound.jsx
    Auth/
      Login.jsx
      Register.jsx
  redux/
    store.js
    slice/
      userSlice.js
```

## Requirements

Before running this project, make sure you have:

- Node.js 18 or higher
- npm or yarn
- A running backend API with URL shortener endpoints

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/your-username/fe-url-shortener.git
cd fe-url-shortener
```

2. Install dependencies

```bash
npm install
```

3. Set the backend URL

Create a `.env.local` file and add the backend URL:

```env
VITE_API_URL=http://localhost:5000
```

4. Run the app locally

```bash
npm run dev
```

Then open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```
Run the development server.

```bash
npm run build
```
Build the production bundle.

```bash
npm run preview
```
Preview the production build locally.

```bash
npm run lint
```
Run ESLint checks.

## API Integration

This frontend connects to a backend API using `VITE_API_URL`.

### Authentication endpoints

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`

### Link endpoints

- `POST /link/create`
- `GET /link/links`
- `DELETE /link/:id/delete`

Example payload for creating a link:

```json
{
  "original_url": "https://example.com/very-long-url",
  "slug": "custom-slug"
}
```

`slug` is optional; if omitted, the backend may generate a random short code.

## Assumptions and Design Decisions

- The frontend depends on a separate backend service for auth and URL storage.
- Authentication is managed with a token stored in Redux state.
- Redux Persist is used to keep the session alive across refreshes.
- The app is designed for a clean user experience and modern dashboard-based management.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
