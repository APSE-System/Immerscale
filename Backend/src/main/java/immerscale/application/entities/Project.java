package immerscale.application.entities;
import jakarta.persistence.*;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue
    @Column(name = "project_id")
    public Integer project_id;

    public String name;

    // foreign key of the worker who created the project
    public String worker_email;

}
