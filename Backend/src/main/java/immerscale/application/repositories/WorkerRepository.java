package immerscale.application.repositories;

import immerscale.application.entities.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepository extends JpaRepository<Worker, String > {
}
