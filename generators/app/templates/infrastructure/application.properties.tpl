<% if (databaseEngine === 'mysql') { %>
# MySQL DATABASE PROPERTIES
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

<% } else if (databaseEngine === 'postgresql') { %>
# PostgreSQL DATABASE PROPERTIES
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.username=postgres
spring.datasource.password=root
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

<% } else if (databaseEngine === 'oracle') { %>
# Oracle DATABASE PROPERTIES
spring.datasource.url=jdbc:oracle:thin:@//localhost:1521/XEPDB1
spring.datasource.driverClassName=oracle.jdbc.OracleDriver
spring.datasource.username=myuser
spring.datasource.password=mypassword
spring.jpa.database-platform=org.hibernate.dialect.OracleDialect

<% } %>

# Hibernate config (common)
spring.jpa.hibernate.ddl-auto=validate
