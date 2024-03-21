package immerscale.application.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "image")
@IdClass(ImageId.class)
public class Image {

    @Id
    private String url_token;

    @Id
    private Integer project_id;

    // encoded image as base64 string
    @Column(columnDefinition = "LONGTEXT")
    private String image;


}
