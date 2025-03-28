<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId><%= groupID %></groupId>
        <artifactId> <%= appName %></artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>

    <artifactId>infrastructure</artifactId>
    <packaging>jar</packaging>

    <dependencies>
        <!-- Dependencia al módulo de aplicación -->
        <dependency>
            <groupId><%= groupID %></groupId>
            <artifactId>application</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>

        <!-- Dependencias específicas de infraestructura -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </dependency>
    </dependencies>
</project>
