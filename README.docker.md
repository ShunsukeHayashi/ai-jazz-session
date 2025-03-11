# Docker Setup for AI Jazz Session

This document provides instructions for running the AI Jazz Session application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Testing Your Docker Setup

Before proceeding with the full setup, you can verify that your Docker environment is correctly configured:

### For Unix-based systems (Linux, macOS):

```bash
# Make the script executable
chmod +x docker-test.sh

# Run the test
./docker-test.sh
```

### For Windows:

```cmd
docker-test.bat
```

The test script will check:
- If Docker and Docker Compose are installed and running
- If all required configuration files exist
- If the Docker Compose configuration is valid

## Environment Variables

Before running the application, you need to set up the environment variables:

1. Copy the example environment file (the test script can do this for you):
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and fill in the required values:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `OPENAI_API_KEY`: Your OpenAI API key

## Building and Running

### Using Helper Scripts

We provide helper scripts for both Unix-based systems and Windows to make Docker operations easier.

#### For Unix-based systems (Linux, macOS):

```bash
# Make the script executable (first time only)
chmod +x docker-scripts.sh

# Set up environment
./docker-scripts.sh setup

# Build Docker images
./docker-scripts.sh build

# Start containers
./docker-scripts.sh start

# View logs
./docker-scripts.sh logs

# Stop containers
./docker-scripts.sh stop

# Show container status
./docker-scripts.sh status

# Clean up everything
./docker-scripts.sh clean
```

#### For Windows:

```cmd
# Set up environment
docker-scripts.bat setup

# Build Docker images
docker-scripts.bat build

# Start containers
docker-scripts.bat start

# View logs
docker-scripts.bat logs

# Stop containers
docker-scripts.bat stop

# Show container status
docker-scripts.bat status

# Clean up everything
docker-scripts.bat clean
```

### Manual Commands

If you prefer to use Docker Compose directly:

```bash
# Build and start the containers
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop the containers
docker-compose down
```

## Accessing the Application

Once the containers are running, you can access:

- Web application: http://localhost:4173
- Supabase Edge Functions: http://localhost:8000

## Troubleshooting

### Container not starting

Check the logs for errors:

```bash
docker-compose logs
```

### Changes not reflecting

If you make changes to the code, you need to rebuild the containers:

```bash
docker-compose up -d --build
```

### Environment variables not working

Make sure your `.env` file is properly formatted and contains all the required variables.

## Development Workflow

For development, it's recommended to:

1. Make changes to your code
2. Rebuild the containers: `docker-compose up -d --build`
3. Check the logs: `docker-compose logs -f`
4. Access the application to test your changes

## Container Structure

The Docker setup consists of two main services:

1. **web**: The React frontend application
   - Built from the Dockerfile in the project root
   - Runs on port 4173

2. **supabase-functions**: The Supabase Edge Functions
   - Uses the official Supabase Edge Runtime image
   - Runs on port 8000
   - Mounts the local functions directory
