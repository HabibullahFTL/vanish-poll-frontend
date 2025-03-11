# Vanish Vote Frontend

A Next.js application built with TypeScript that interacts with the Vanish Vote Backend API to provide a Poll Management Platform with a smooth and responsive user interface. The frontend leverages React and the latest features of Next.js to manage and display polls, reactions, and comments.

## Deployed live link

You can access the live version of the Vanish Vote Frontend at: https://vanish-poll-frontend.vercel.app

## Features

### Poll Management

1. **View Polls**
   - Displays a list of polls that are public and not expired.
2. **Poll Details**
   - Shows detailed information about a specific poll.
3. **Vote on Poll**
   - Allows users to vote for an option within a poll.
4. **View Poll Results**
   - Displays the results of the poll after voting or on view if the poll is no longer accepting votes.
5. **Add Reactions**
   - Users can react to a poll with reactions like "👍" or "🔥".
6. **Share Poll**
   - Allows users to share the poll via a copyable link.

### Comments

1. **Add a Comment**
   - Allows users to add comments to polls.
2. **View Comments**
   - Displays all comments on a specific poll.

## Technologies

- **Frontend**: Next.js, React
- **State Management**: React (using hooks)
- **Styling**: Tailwind CSS
- **TypeScript**: Strongly typed for better developer experience and code reliability
- **API Integration**: SWR with Fetch API (for connecting to the Vanish Vote Backend)
- **Toast Notifications**: react-hot-toast (for user feedback and notifications)
- **Icons**: react-icons (for adding icons like thumbs up, messages, and share)
- **Date Handling**: date-fns (for formatting dates and times)

## Setup Instructions (For Running the Project Locally)

### Prerequisites

- Node.js v16 or higher
- Yarn (optional, but recommended)
- A running instance of the Vanish Vote Backend API

### Steps

1. Clone the repository

```bash
git clone <repository-link>
cd vanish-vote-frontend
```

2. Install Dependencies

```bash
yarn install
```

3. Environment Variables

   Create a `.env` file in the root directory and add the environment variables to configure the backend URL.

```env
NEXT_PUBLIC_API_URL = "<your_backend_api_url>"
```

4. Start the Development Server

```bash
yarn dev
```

5. Access the Frontend

   The frontend will be running at [http://localhost:3000](http://localhost:3000).

---

Feel free to adjust the live link, repository link, or any other details to match your specific setup.
