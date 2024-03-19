package immerscale.application.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue
    public Integer id;

    public String name;

    // foreign key of the worker who created the project
    @ManyToOne
    @JoinColumn(name = "worker_email")
    public Worker worker;
}
