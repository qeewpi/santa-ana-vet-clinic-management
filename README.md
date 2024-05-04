# santa-ana-vet-clinic-management

## Backend Setup

This project uses Spring Boot and MySQL. Follow the steps below to set up the backend.

### Step 1: Create the Database

Open your MySQL client and create a new database called `savcmDb`.

```sql
CREATE DATABASE savcmDb;
```

### Step 2: Modify the application.properties

Navigate to `src/main/resources/application.properties` and modify the following lines with your MySQL credentials and database name:

```properties
spring.datasource.url = jdbc:mysql://localhost:3306/savcmDb
spring.datasource.username = your_username
spring.datasource.password = your_password
```
### Step 3: Build and Run the Application

Navigate to the root directory of the project and run the following command to build and run the application:

```bash
mvn spring-boot:run
```

### Step 4: Initialize Roles in Database

Open your MySQL client and run the following SQL commands to insert `roles` into the roles table:

```sql
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_VETERINARIAN');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```