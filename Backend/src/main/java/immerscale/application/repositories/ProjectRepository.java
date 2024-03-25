package immerscale.application.repositories;

import immerscale.application.entities.AccessToken;
import immerscale.application.entities.Image;
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


    @Query(value = "INSERT INTO project (project_id, name, worker_email) VALUES (?1, ?2, ?3)", nativeQuery = true)
    @Modifying
    @Transactional
    void saveProject(Integer project_id, String name, String worker_email);


    @Query(value = "SELECT * FROM access_token WHERE project_id=?1", nativeQuery = true)
    @Transactional
    Iterable<AccessToken> getAccessTokens(Integer projectId);
}
