package immerscale.application.repositories;

import immerscale.application.entities.Project;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @Query(value = "INSERT INTO project (project_id, name, worker_email) VALUES (?1, ?2, ?3)", nativeQuery = true)
    @Modifying
    @Transactional
    void saveProject(Integer project_id, String name, String worker_email);
}
