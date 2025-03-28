<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId><%= groupID %></groupId>
        <artifactId> <%= appName %></artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>

    <artifactId>application</artifactId>
    <packaging>jar</packaging>

    <dependencies>
        <!-- Dependencia al módulo de dominio -->
        <dependency>
            <groupId><%= groupID %></groupId>
            <artifactId>domain</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>
</project>
