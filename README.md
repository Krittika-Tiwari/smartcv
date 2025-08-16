# SmartCV

SmartCV is an AI-powered resume builder designed to help users create professional, ATS-optimized resumes with minimal effort. Leveraging Google Gemini, SmartCV can automatically generate summaries, work experiences, and project entries from simple descriptions, saving you time and ensuring your resume stands out.

## Features

- **AI Resume Summary:** Instantly generate tailored summaries for any job role.
- **Work Experience Generator:** Expand brief job descriptions into detailed, professional bullet points.
- **Project Generator:** Create project entries with technology stack, dates, and achievements.
- **Modern UI:** Built with React, TypeScript, and Tailwind CSS for a fast and responsive experience.
- **Validation:** Uses Zod for robust input validation.
- **Environment-based Configuration:** Easily manage API keys and other secrets.

## Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn or npm
- Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Krittika-Tiwari/smartcv.git
   cd smartcv
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database configuration
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_URL_NO_SSL=
POSTGRES_PRISMA_URL=

# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=

# Vercel Blob storage
BLOB_READ_WRITE_TOKEN=

# Google Gemini API
GOOGLE_API_KEY=
```

| Variable                          | Description                             |
| --------------------------------- | --------------------------------------- |
| POSTGRES_HOST                     | PostgreSQL database host                |
| POSTGRES_PASSWORD                 | PostgreSQL database password            |
| POSTGRES_DATABASE                 | PostgreSQL database name                |
| POSTGRES_URL_NO_SSL               | PostgreSQL connection string (no SSL)   |
| POSTGRES_PRISMA_URL               | PostgreSQL connection string for Prisma |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk publishable key for frontend auth |
| CLERK_SECRET_KEY                  | Clerk secret key for backend auth       |
| NEXT_PUBLIC_CLERK_SIGN_IN_URL     | Clerk sign-in page URL                  |
| NEXT_PUBLIC_CLERK_SIGN_UP_URL     | Clerk sign-up page URL                  |
| BLOB_READ_WRITE_TOKEN             | Vercel Blob storage read/write token    |
| GOOGLE_API_KEY                    | Google Gemini API key for AI features   |

You can get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

**Note:**

- Never commit your `.env` file with real secrets to public repositories.
- Clerk keys are for authentication; see [Clerk Docs](https://clerk.com/docs) for setup.
- Vercel Blob is used for file storage; see [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)

### Running the App

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Fill in your resume details in the form.
- Use the "Smart fill (AI)" buttons to auto-generate content for summary, work experience, and projects.
- Review and edit the generated entries as needed.
- Export or copy your resume for job applications.

## Project Structure

- `src/lib/gemini.ts` – Gemini API integration
- `src/lib/validation.ts` – Zod schemas for validation
- `src/app/(main)/editor/form/action.ts` – AI generation logic
- `src/app/(main)/editor/form/GenerateProjectButton.tsx` – Project AI button component

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

---

**Note:** This project uses the Google Gemini API. Make sure you comply with their terms of service.
