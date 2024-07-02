
# How to Run the Application

Follow these steps to get the application up and running:

## Step 1: Start the Docker Containers

To start the application, run the following command:

```sh
docker-compose up -d
```

## Step 2: Create the PostgreSQL Schema

After the containers are up and running, access the shell of the application container:

```sh
docker exec -it tot-app sh
```

Once inside the container, run the following command to create the PostgreSQL schema:

```sh
npm run prisma:push
```

This command will generate the schema within the PostgreSQL database inside the container.

## Step 3: Access the OpenAPI Documentation

Navigate to the following URL in your web browser to access the OpenAPI documentation and start executing some API requests:

[http://localhost:3000/docs](http://localhost:3000/docs)


# Running the Project Locally

If you prefer to run the project locally without Docker, follow these steps:

## Step 1: Setting Up Environment

Ensure you have created a `.env` file containing your `DATABASE_URL` secret for Prisma database connection.

## Step 2: Install all dependencies

```sh
npm i
npm run prisma:push
npm run prisma:generate
```

These commands will install all the dependencies of the project, generate the schema of your db and generate the prisma client

## Step 3: Building the Project

Build the TypeScript project by running the following command in your terminal:


```sh
npm run build
```

This command compiles the TypeScript code into JavaScript

## Step 4: Starting the Server

Once the project is built, start the server with the following command:

```sh
npm start
```

This command will start the server locally

