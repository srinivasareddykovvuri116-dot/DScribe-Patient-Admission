FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY . .

RUN chmod +x mvnw && ./mvnw -B clean package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV SERVER_PORT=10000
ENV TZ=Asia/Kolkata

EXPOSE 10000

ENTRYPOINT ["java", "-Duser.timezone=Asia/Kolkata", "-jar", "app.jar"]