<% if (dataBaseEngine === 'MongoDB') { %>
# MONGODB DATABASE PROPERTIES
spring.main.allow-bean-definition-overriding=true
spring.data.mongodb.database=db-mongo
spring.data.mongodb.port=27017
spring.data.mongodb.host=localhost
<% } else { %>
# Hibernate config (common)
spring.jpa.hibernate.ddl-auto=validate

<% if (dataBaseEngine === 'MySql') { %>
# MySQL DATABASE PROPERTIES
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

<% } else if (dataBaseEngine === 'Postgres') { %>
# PostgreSQL DATABASE PROPERTIES
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.username=postgres
spring.datasource.password=root
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

<% } else if (dataBaseEngine === 'Oracle') { %>
# Oracle DATABASE PROPERTIES
spring.datasource.url=jdbc:oracle:thin:@//localhost:1521/XEPDB1
spring.datasource.driverClassName=oracle.jdbc.OracleDriver
spring.datasource.username=myuser
spring.datasource.password=mypassword
spring.jpa.database-platform=org.hibernate.dialect.OracleDialect
<% } %>
<% } %>