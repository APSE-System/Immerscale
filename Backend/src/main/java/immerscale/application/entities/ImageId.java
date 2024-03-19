package immerscale.application.entities;
import java.io.Serializable;

// This class is used to create a composite primary key for the Image entity
// This is a common practice in JPA https://www.baeldung.com/jpa-composite-primary-keys
public class ImageId implements Serializable {

    private String url_token;
    private String worker_email;

    public ImageId( String url_token, String worker_email ) {
        this.url_token = url_token;
        this.worker_email = worker_email;
    }
}
