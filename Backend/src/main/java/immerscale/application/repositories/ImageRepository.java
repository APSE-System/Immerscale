package immerscale.application.repositories;
import immerscale.application.entities.Image;
import immerscale.application.entities.ImageId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ImageRepository extends JpaRepository<Image, ImageId> {

    // Query to save an image
    @Query(value = "INSERT INTO image (url_token, project_id, image) VALUES (?1, ?2, ?3)", nativeQuery = true)
    void saveImage(String url_token, Integer project_id, String image);
}
