#use maven
FROM maven:3.8.7-eclipse-temurin-19 AS builder
ADD . /src
WORKDIR /src
RUN mvn -f pom.xml clean package

FROM openjdk:19-slim
COPY --from=builder /src/target/*.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","/app/app.jar"]
EXPOSE 8080