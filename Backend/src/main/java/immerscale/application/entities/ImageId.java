package immerscale.application.entities;

import java.io.Serializable;

public class ImageId implements Serializable {

    private String url_token;
    private String worker_email;

    public ImageId( String url_token, String worker_email ) {
        this.url_token = url_token;
        this.worker_email = worker_email;
    }
}
