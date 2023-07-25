FROM openjdk:17-jdk-alpine

RUN apk add --no-cache maven

WORKDIR /app

COPY . /app

RUN mvn clean install

EXPOSE 8080

CMD ["java", "-jar", "./target/PlayerAPI-0.0.1.jar"]