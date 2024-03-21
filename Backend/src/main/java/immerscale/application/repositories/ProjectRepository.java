package immerscale.application.repositories;

import immerscale.application.entities.Project;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    // Query to retrieve all projects
    @Query(value = "SELECT * FROM project", nativeQuery = true)
    @Transactional
    Iterable<Project> getAllProjects();

}
