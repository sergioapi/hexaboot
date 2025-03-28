package <%= groupID %>.infrastructure.controllers;

import <%= groupID %>.application.services.<%= entityName %>Service;
import <%= groupID %>.domain.models.Additional<%= entityName %>Info;
import <%= groupID %>.domain.models.<%= entityName %>;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/<%= entityVarName %>s")
public class <%= entityName %>Controller {
    private final <%= entityName %>Service <%= entityVarName %>Service;

    public <%= entityName %>Controller(<%= entityName %>Service <%= entityVarName %>Service) {
        this.<%= entityVarName %>Service = <%= entityVarName %>Service;
    }

    @PostMapping
    public ResponseEntity<<%= entityName %>> create<%= entityName %>(@RequestBody <%= entityName %> <%= entityVarName %>) {
        <%= entityName %> created<%= entityName %> = <%= entityVarName %>Service.create<%= entityName %>(<%= entityVarName %>);
        return new ResponseEntity<>(created<%= entityName %>, HttpStatus.CREATED);
    }

    @GetMapping("/{<%= entityVarName %>Id}")
    public ResponseEntity<<%= entityName %>> get<%= entityName %>ById(@PathVariable Long <%= entityVarName %>Id) {
        return <%= entityVarName %>Service.get<%= entityName %>(<%= entityVarName %>Id)
                .map(<%= entityVarName %> -> new ResponseEntity<>(<%= entityVarName %>, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<<%= entityName %>>> getAll<%= entityName %>s() {
        List<<%= entityName %>> <%= entityVarName %>s = <%= entityVarName %>Service.getAll<%= entityName %>s();
        return new ResponseEntity<>(<%= entityVarName %>s, HttpStatus.OK);
    }

    @PutMapping("/{<%= entityVarName %>Id}")
    public ResponseEntity<<%= entityName %>> update<%= entityName %>(@PathVariable Long <%= entityVarName %>Id, @RequestBody <%= entityName %> update<%= entityName %>) {
        return <%= entityVarName %>Service.update<%= entityName %>(<%= entityVarName %>Id, update<%= entityName %>)
                .map(<%= entityVarName %> -> new ResponseEntity<>(<%= entityVarName %>, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{<%= entityVarName %>Id}")
    public ResponseEntity<Void> delete<%= entityName %>ById(@PathVariable Long <%= entityVarName %>Id) {
        if(<%= entityVarName %>Service.delete<%= entityName %>(<%= entityVarName %>Id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}