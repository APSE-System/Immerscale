package immerscale.application.entities;

import jakarta.persistence.*;
import java.util.Date;


@Entity
@Table(name = "access_token")
public class AccessToken {

    @Id
    private String url_token;

    private String name;
    private Date creation_date;
    private Date expiration_date;

    private Integer project_id;


}
