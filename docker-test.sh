#!/bin/bash
# Test script for Docker setup

echo "Testing Docker setup for AI Jazz Session..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed or not in PATH"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed or not in PATH"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "Error: Docker daemon is not running"
    exit 1
fi

echo "✓ Docker and Docker Compose are installed and running"

# Check if required files exist
if [ ! -f "Dockerfile" ]; then
    echo "Error: Dockerfile not found"
    exit 1
fi

if [ ! -f "docker-compose.yml" ]; then
    echo "Error: docker-compose.yml not found"
    exit 1
fi

if [ ! -f ".env.example" ]; then
    echo "Error: .env.example not found"
    exit 1
fi

echo "✓ Required Docker configuration files exist"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✓ Created .env file (please edit with your credentials)"
else
    echo "✓ .env file already exists"
fi

# Test Docker build (without actually building)
echo "Testing Docker build configuration..."
docker-compose config -q
if [ $? -ne 0 ]; then
    echo "Error: Docker Compose configuration is invalid"
    exit 1
fi

echo "✓ Docker Compose configuration is valid"

echo "All tests passed! Your Docker setup appears to be correct."
echo ""
echo "Next steps:"
echo "1. Edit the .env file with your credentials"
echo "2. Run './docker-scripts.sh build' to build the Docker images"
echo "3. Run './docker-scripts.sh start' to start the containers"
echo ""
echo "For more information, see README.docker.md"
