
### Database Setup
1. Since everyone is using Windows install "Docker Desktop" from [here](https://docs.docker.com/desktop/install/windows-install/).
2. Start the application so the **Docker Deamon** is running in the background
3. Once started open a terminal
4. cd to ./Database (i.e. where the docker-compose.yaml is)
5. Run ```docker compose up -d``` to run the mysql container

### More useful commands
- ```docker ps``` => list all running docker containers
- ```docker stop <CONTAINER ID>``` (ID can be retrieved from previous command)
- ```docker rm <CONTAINER ID>``` Destroy container
- ```docker exec -it <CONATINER ID> bin/bash``` => enter the docker with a bash terminal
- ```mysql -u username -p``` => log into mysql database (username and password can be found in the docker-compose.yaml)

**mysql** commands:
- ```show databases;``` => lists all databases
- ```use <db>;``` => select a database
- ```show tables;``` => lists all tables in the database
- ```desc <table>;``` => describe table structure
> after selecting a table you can execute any sql statement you want to (like select ...)
