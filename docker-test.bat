@echo off
REM Test script for Docker setup (Windows version)

echo Testing Docker setup for AI Jazz Session...

REM Check if Docker is installed
docker --version > nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Docker is not installed or not in PATH
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version > nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Docker Compose is not installed or not in PATH
    exit /b 1
)

REM Check if Docker daemon is running
docker info > nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Docker daemon is not running
    exit /b 1
)

echo ✓ Docker and Docker Compose are installed and running

REM Check if required files exist
if not exist Dockerfile (
    echo Error: Dockerfile not found
    exit /b 1
)

if not exist docker-compose.yml (
    echo Error: docker-compose.yml not found
    exit /b 1
)

if not exist .env.example (
    echo Error: .env.example not found
    exit /b 1
)

echo ✓ Required Docker configuration files exist

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env > nul
    echo ✓ Created .env file (please edit with your credentials)
) else (
    echo ✓ .env file already exists
)

REM Test Docker build (without actually building)
echo Testing Docker Compose configuration...
docker-compose config > nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Docker Compose configuration is invalid
    exit /b 1
)

echo ✓ Docker Compose configuration is valid

echo All tests passed! Your Docker setup appears to be correct.
echo.
echo Next steps:
echo 1. Edit the .env file with your credentials
echo 2. Run 'docker-scripts.bat build' to build the Docker images
echo 3. Run 'docker-scripts.bat start' to start the containers
echo.
echo For more information, see README.docker.md
