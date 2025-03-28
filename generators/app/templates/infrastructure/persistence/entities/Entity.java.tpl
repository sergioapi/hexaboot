package <%= groupID %>.domain.models;

import <%= groupID %>.domain.models.<%= entityName %>;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class <%= entityName %>Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;

    public <%= entityName %>Entity (Long id, String text){
        this.id = id;
        this.text = text;
    }

    public <%= entityName %>Entity (){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}