package immerscale.application.repositories;

import immerscale.application.entities.Image;
import immerscale.application.entities.ImageId;
import immerscale.application.entities.Project;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface ProjectRepository extends JpaRepository<Image, ImageId> {

    // Query to retrieve all projects
    @Query(value = "SELECT * FROM project", nativeQuery = true)
    @Transactional
    Iterable<Object> getAllProjects();

}
