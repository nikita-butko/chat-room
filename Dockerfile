FROM openjdk:8-jdk-alpine
ADD target/chat-1.0.jar chat-1.0.jar
EXPOSE 8080 15672 61613 5672
ENTRYPOINT ["java", "-jar", "/chat-1.0.jar"]