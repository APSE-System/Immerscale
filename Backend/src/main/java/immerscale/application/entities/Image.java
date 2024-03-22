package immerscale.application.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "image")
@IdClass(ImageId.class)
public class Image {

    @Id
    public String url_token;

    @Id
    public Integer project_id;

    // encoded image as base64 string
    @Column(columnDefinition = "LONGTEXT")
    public String image;


}
