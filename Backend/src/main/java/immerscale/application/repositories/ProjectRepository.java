package immerscale.application.repositories;

import immerscale.application.entities.Project;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    // Query to retrieve all projects
    @Query(value = "SELECT * FROM project", nativeQuery = true)
    @Transactional
    Iterable<Project> getAllProjects();


    // Query to create a project, simple insert statement
    @Query(value = "INSERT INTO project ( name, worker_email) VALUES (?1, ?2)", nativeQuery = true)
    @Modifying
    @Transactional
    void saveProject( String name, String worker_email);

    // Query to get all projects of a worker
    @Query(value = "SELECT * FROM project WHERE worker_email=?1", nativeQuery = true)
    @Transactional
    Iterable<Project> getAllProjects(String worker_email);

    // Query to check that a project 1. exists and 2. belongs to the worker
    @Query(value = "SELECT IF( COUNT(*) > 0, 'true', 'false') FROM project WHERE project_id=?1 AND worker_email=?2", nativeQuery = true)
    @Transactional
    boolean containsProject(Integer projectId, String worker_email);

    @Query(value = "SELECT name FROM project WHERE project_id=?1", nativeQuery = true)
    @Transactional
    String getProjectName(Integer projectId);

}
