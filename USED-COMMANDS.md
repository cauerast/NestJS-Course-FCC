## Nest and npm

* `npm i -g @nestjs/cli`
  Installs the NestJS CLI globally on your machine.

* `nest new project-name`
  Creates the initial structure of a brand-new NestJS project.

* `npm run start:dev`
  Starts the development server with hot-reload (auto-restarts when files change).

* `nest g resource resource-name`
  Generates a complete CRUD structure (module, controller, service, entity, and DTOs).

* `nest g mo module-name`
  Creates a new isolated module.

* `nest g controller controller-name`
  Creates a new controller to manage API routes.

* `nest g s service-name`
  Creates a new service to handle business logic.

---

## Prisma

* `npx prisma init`
  Initializes Prisma in the project, creating the 'prisma' folder and a '.env' file.

* `npx prisma migrate dev --name migration_name`
  Creates a SQL migration file and applies the schema changes to your database.

* `npx prisma generate`
  Regenerates the Prisma Client inside node_modules to update TypeScript types.

* `npx prisma studio`
  Opens a GUI in your browser (usually on port 5555) to view and edit database data.

* `npx prisma db seed`
  Executes the seed script to populate the database with initial data (if configured).

---

## Docker

* `docker compose up -d`
  Starts all containers defined in 'docker-compose.yml' in the background (detached mode).

* `docker compose down`
  Stops and removes the project containers, keeping the volume data intact.

* `docker compose down -v`
  Stops the containers and permanently deletes all associated data volumes.

* `docker ps`
  Lists all currently running containers.

* `docker ps -a`
  Lists all containers on your machine, including the stopped ones.

* `docker logs container-name`
  Displays the log history for a specific container.

* `docker compose logs -f`
  Streams and follows logs from all services in the compose file in real time.

---

## Sys

* `lsof -i :3000`
  Lists the process (PID) using port 3000 (essential when a "port already in use" error occurs).

* `kill -9 <PID>`
  Forcefully terminates a specific process using its Process ID (PID) number.

* `killall node`
  Instantly kills all Node.js processes running on your system.

* `top`
  Opens the terminal task manager to monitor CPU, memory usage, and active processes.
  
* `ls -la`
  Lists all files in the current directory, including permissions, details, and hidden files (like '.env').
