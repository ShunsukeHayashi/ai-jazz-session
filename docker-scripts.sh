#!/bin/bash

# Docker helper script for AI Jazz Session

# Function to display help message
show_help() {
  echo "Usage: ./docker-scripts.sh [COMMAND]"
  echo ""
  echo "Commands:"
  echo "  setup      - Create .env file from template and prepare environment"
  echo "  build      - Build Docker images"
  echo "  start      - Start Docker containers"
  echo "  stop       - Stop Docker containers"
  echo "  restart    - Restart Docker containers"
  echo "  logs       - Show logs from Docker containers"
  echo "  status     - Show status of Docker containers"
  echo "  clean      - Remove Docker containers, images, and volumes"
  echo "  help       - Show this help message"
  echo ""
}

# Function to set up environment
setup() {
  if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please edit the .env file and fill in your credentials."
  else
    echo ".env file already exists."
  fi
}

# Function to build Docker images
build() {
  echo "Building Docker images..."
  docker-compose build
}

# Function to start Docker containers
start() {
  echo "Starting Docker containers..."
  docker-compose up -d
  echo "Containers started. Web app available at http://localhost:4173"
}

# Function to stop Docker containers
stop() {
  echo "Stopping Docker containers..."
  docker-compose down
}

# Function to restart Docker containers
restart() {
  echo "Restarting Docker containers..."
  docker-compose restart
}

# Function to show logs
logs() {
  echo "Showing logs from Docker containers..."
  docker-compose logs -f
}

# Function to show status
status() {
  echo "Status of Docker containers:"
  docker-compose ps
}

# Function to clean up
clean() {
  echo "Removing Docker containers, images, and volumes..."
  docker-compose down --rmi all --volumes --remove-orphans
}

# Main script logic
case "$1" in
  setup)
    setup
    ;;
  build)
    build
    ;;
  start)
    start
    ;;
  stop)
    stop
    ;;
  restart)
    restart
    ;;
  logs)
    logs
    ;;
  status)
    status
    ;;
  clean)
    clean
    ;;
  help|*)
    show_help
    ;;
esac
