package immerscale.application.entities;
import jakarta.persistence.*;
@Entity
@Table(name = "worker")
public class Worker {
    @Id
    @Column(name = "worker_email")
    public String worker_email;

}
