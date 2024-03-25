package immerscale.application.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue
    public Integer image_id;
    public String url_token;

    public Integer project_id;

    // encoded image as base64 string
    @Column(columnDefinition = "LONGTEXT")
    public String image;


}
