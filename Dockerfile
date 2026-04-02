FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY branch-sales-management/package*.json ./
RUN npm ci
COPY branch-sales-management/ ./
RUN npm run build

FROM maven:3.9.9-eclipse-temurin-17 AS backend-build
WORKDIR /app/backend
COPY branch-sales-backend/pom.xml ./pom.xml
RUN mvn -q -DskipTests dependency:go-offline
COPY branch-sales-backend/src ./src
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN mvn -DskipTests package

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-XX:MaxRAMPercentage=75","-jar","/app/app.jar"]
