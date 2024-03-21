package immerscale.application.entities;

import jakarta.persistence.*;
import jdk.jfr.Name;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "worker")
public class Worker {
    @Id
    @Column(name = "worker_email")
    public String worker_email;

}
