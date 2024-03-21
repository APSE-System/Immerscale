package immerscale.application.entities;
import java.io.Serializable;

// This class is used to create a composite primary key for the Image entity
// This is a common practice in JPA https://www.baeldung.com/jpa-composite-primary-keys
public class ImageId implements Serializable {

    private String url_token;
    private Integer project_id;

    public ImageId( String url_token, Integer project_id ) {
        this.url_token = url_token;
        this.project_id = project_id;
    }
}
