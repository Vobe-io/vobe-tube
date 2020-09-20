FROM openjdk:14 AS builder
RUN mkdir /application
WORKDIR /application
COPY ./ ./
RUN ./gradlew clean build --no-daemon

FROM openjdk:14-alpine
WORKDIR /app
COPY --from=builder /application/build/libs/app.jar .
CMD ["java", "-jar", "/app/app.jar"]