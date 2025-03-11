@echo off
REM Docker helper script for AI Jazz Session (Windows version)

IF "%1"=="" GOTO help
IF "%1"=="help" GOTO help
IF "%1"=="setup" GOTO setup
IF "%1"=="build" GOTO build
IF "%1"=="start" GOTO start
IF "%1"=="stop" GOTO stop
IF "%1"=="restart" GOTO restart
IF "%1"=="logs" GOTO logs
IF "%1"=="status" GOTO status
IF "%1"=="clean" GOTO clean
GOTO help

:help
echo Usage: docker-scripts.bat [COMMAND]
echo.
echo Commands:
echo   setup      - Create .env file from template and prepare environment
echo   build      - Build Docker images
echo   start      - Start Docker containers
echo   stop       - Stop Docker containers
echo   restart    - Restart Docker containers
echo   logs       - Show logs from Docker containers
echo   status     - Show status of Docker containers
echo   clean      - Remove Docker containers, images, and volumes
echo   help       - Show this help message
echo.
GOTO end

:setup
IF NOT EXIST .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo Please edit the .env file and fill in your credentials.
) ELSE (
    echo .env file already exists.
)
GOTO end

:build
echo Building Docker images...
docker-compose build
GOTO end

:start
echo Starting Docker containers...
docker-compose up -d
echo Containers started. Web app available at http://localhost:4173
GOTO end

:stop
echo Stopping Docker containers...
docker-compose down
GOTO end

:restart
echo Restarting Docker containers...
docker-compose restart
GOTO end

:logs
echo Showing logs from Docker containers...
docker-compose logs -f
GOTO end

:status
echo Status of Docker containers:
docker-compose ps
GOTO end

:clean
echo Removing Docker containers, images, and volumes...
docker-compose down --rmi all --volumes --remove-orphans
GOTO end

:end
