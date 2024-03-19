package immerscale.application.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jdk.jfr.Name;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "worker")
public class Worker {
    @Id
    @Name("worker_email")
    public String worker_email;
}
