# masterpieceHub

[Hosted Site](https:exhibition-curator-joemosley96s-projects.vercel.app)

## Project Description

A Pinterest-style exhibition curation platform where users can browse artworks and create their own virtual collections. Artwork from the V&A Gallery and the Chicago Art Intitute APIs is available for users to view and interact with. As it is a progressive web app, the platform can either be used in the browser or installed locally.

## Technologies Used

- TypeScript
- Next.js (App Router)
- React
- TailwindCSS
- DaisyUI
- Vercel Postgres
- Vercel Blob

## Setup
To run the project locally, you will need to have Node.js and npm installed globally on your machine

Clone the repo

```
git clone https://github.com/JoeMosley96/exhibition-curator.git
```

Navigate to the project directory

```
cd masterpieceHub
```

Install dependencies

```
npm install
```

Setup a Vercel Postgres database and Vercel Blob database
Follow this get started link: https://vercel.com/docs/getting-started-with-vercel

Create a .env file in the root directory. Copy the environment variables from the settings tab in both databases and paste them in the .env file.

Build the app

```
npm run dev
```


Run the app

```
npm run dev
```

Seed the database by navigating to http://localhost:3000/seed in the URL box - you should get a message saying "Database seeded successfully"

When using the site on Google Chrome, an "Install" button should appear on the right hand side of the URL box - so that the app can be saved to the desktop.

## Approach

I approached the developmet of the app by creating user stories and wireframe diagrams to define the user experience. I wanted the app to be as intuitive and simple to use as possible.

Loading states were handled using React's Suspense feature. DaisyUI's component library, along with Tailwind CSS, was used to create a responsive and interactive user interface.