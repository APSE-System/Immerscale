package immerscale.application.entities;

import jakarta.persistence.*;
import java.util.Date;


@Entity
@Table(name = "access_token")
public class AccessToken {

    @Id
    public String url_token;

    public String name;
    public Date creation_date;
    public Date expiration_date;

    public Integer project_id;


}
