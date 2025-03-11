# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/dc1774e3-e79c-407e-9b59-032131b6b162

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/dc1774e3-e79c-407e-9b59-032131b6b162) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Using Lovable

Simply open [Lovable](https://lovable.dev/projects/dc1774e3-e79c-407e-9b59-032131b6b162) and click on Share -> Publish.

### Using Docker

This project includes Docker configuration for easy deployment. See [Docker Setup](README.docker.md) for detailed instructions.

Quick start:

```bash
# Test your Docker setup first
# For Unix-based systems
chmod +x docker-test.sh
./docker-test.sh

# For Windows
docker-test.bat

# Then build and run
# For Unix-based systems
chmod +x docker-scripts.sh
./docker-scripts.sh setup
./docker-scripts.sh build
./docker-scripts.sh start

# For Windows
docker-scripts.bat setup
docker-scripts.bat build
docker-scripts.bat start
```

Once running, access the application at:
- Web application: http://localhost:4173
- Supabase Edge Functions: http://localhost:8000

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

Alternatively, you can use the Docker setup with your own hosting provider and configure the domain there.
