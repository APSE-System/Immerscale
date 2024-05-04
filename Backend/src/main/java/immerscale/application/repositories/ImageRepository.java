package immerscale.application.repositories;
import immerscale.application.entities.Image;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface ImageRepository extends JpaRepository<Image, Integer> {

    // Query to save an image, simple insert statement
    // "Modifying" annotation is crucial for queries that dont return a result, else Exception
    @Query(value = "INSERT INTO image (url_token, project_id, image) VALUES (?1, ?2, ?3)", nativeQuery = true)
    @Modifying
    @Transactional
    void saveImage(String url_token, Integer project_id, String image);


    @Query(value = "SELECT * FROM image WHERE project_id=?1", nativeQuery = true)
    @Transactional
    Iterable<Image> getImages(Integer projectId);

    // returns only one image
    // this will be the nth element from the project
    @Query(value = "SELECT * FROM image WHERE project_id=?1 LIMIT 1 OFFSET ?2", nativeQuery = true)
    @Transactional
    Image getImage(Integer imageId, Integer index);
}
