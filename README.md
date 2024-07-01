
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
