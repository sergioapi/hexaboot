package <%= package %>;

import <%= pathEntity %>.<%= model %>Entity;
import org.springframework.stereotype.Repository;
<% if (DBtype==='Sql') { %> 
import org.springframework.data.jpa.repository.JpaRepository;
<% } else { %> 
import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;
<% } %>
// Autogenerated <%= model %> Repository interface.

@Repository
public interface <%= model %>DataRepository extends <% if (dataBaseEngine === 'MongoDB') { %> MongoRepository<<%= model %>Entity, ObjectId> <% } else { %> JpaRepository<<%= model %>Entity, Long> <% } %> {
}
