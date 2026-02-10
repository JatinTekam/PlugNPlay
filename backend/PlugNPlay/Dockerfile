
#Build Stage

FROM maven:3.9.6-eclipse-temurin-21 AS build


WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests


#Run Stage

FROM eclipse-temurin:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy your application's JAR file into the container
COPY --from=build /app/target/*.jar app.jar

# Command to run the application when the container starts
EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]


