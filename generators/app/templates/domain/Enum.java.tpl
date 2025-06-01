package <%= groupID %>;

public enum <%= enumName %> {
<% values.forEach((value, index) => { %>
    <%= value %><%= index < values.length - 1 ? ',' : '' %>
<% }); %>
}
