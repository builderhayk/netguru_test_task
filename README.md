# Net Guru test task

## micro service to create and get movies

## Running Locally

Make sure you have Docker and Docker compose installed.
After cloning copy *.env.example* code to *.env* file

Then run this command to make docker container with app and run.

```sh
docker-compose up --build
```

**How to use**

after getting the token from auth service 
put it in the header of you request like this {"authorization": "Bearer <token>"}

do the request like this 

for getting the movies of user 
```sh
curl --location --request POST 'http://localhost:8080/api/movies' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Gatsby"
}'
```
for creating a movie 
  ```sh
  curl --location --request GET 'http://localhost:8080/api/movies' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json'
```
