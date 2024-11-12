# NewIndia Frontend

React-based frontend for the NewIndia platform.

## Environment Setup

1. Create a `.env.local` file in the app directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_BACKEND_URL=http://localhost:5002
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
app/
├── public/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── data/          # Static data
│   └── App.js         # Root component
└── README.md
```
