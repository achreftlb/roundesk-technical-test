
# Roundesk Technical Test

A small Nestjs/Reactjs project for a technical interview showcasing a basic undrestanding of the nestjs and react technologies




## Documentation

This project can run on two envirements (local and Docker)

### Run with Docker

1. Make sure you already installed Docker and Docker-compose

2. Make sure you have the **.env** file in the project root folder, and contain the default envirement variable:

 ```
DATABASE_HOST=db
DATABASE_PORT=3306
DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_NAME=test_db
REACT_APP_API_URL=http://localhost:3000/
 ```

3. In the project root folder run `docker-compose`:

 ```
docker-compose up --build -d
 ```

 4. Within your browser access:

 ```
 front -> http://localhost:3001
 api -> http://localhost:3000
 phpmyadmin -> http://localhost:8080 (user: root / password: secret)
 ``` 

 ### Run in Local envirement

1. Make sure to change envirement variable in the **.env** file 

 ```
DATABASE_HOST=localhost #**Mysql database host**
DATABASE_PORT=3306
DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_NAME=test_db
REACT_APP_API_URL=http://localhost:3000/
 ```

2. Install npm dependencies & run the backend:

 ```
cd roundesk-technical-test-api
npm install
npm run start

 ```
2. Install npm dependencies & run the front:

 ```
cd roundesk-technical-test-front
npm install
npm start

 ```


**NB**: If needed you can only run the database & phpmyadmin with:
```
docker-compose -f docker-compose.onlydb.yml up

-----------------
host:     localhost
port:     3306
database: test_db
user:     user
password: password
```