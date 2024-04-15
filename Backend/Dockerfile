#use maven
FROM maven:3.8.7-eclipse-temurin-19 AS builder
WORKDIR /src
ADD ./pom.xml /src
RUN mvn dependency:go-offline
ADD . /src
RUN mvn clean package


FROM openjdk:19-slim
COPY --from=builder /src/target/*.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","/app/app.jar"]
EXPOSE 8080