package immerscale.application.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "image")
@IdClass(ImageId.class)
public class Image {

    @Id
    private String url_token;

    @Id
    private String worker_email;

    // encoded image as base64 string
    private String image;

}
