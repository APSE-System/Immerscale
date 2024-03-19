package immerscale.application.entities;

import jakarta.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "url_token", referencedColumnName = "url_token", insertable = false, updatable = false)
    private AccessToken accessToken;

    @ManyToOne
    @JoinColumn(name = "worker_email", referencedColumnName = "worker_email", insertable = false, updatable = false)
    private Worker worker;

}
