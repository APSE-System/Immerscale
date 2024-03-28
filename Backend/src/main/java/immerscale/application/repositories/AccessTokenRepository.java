package immerscale.application.repositories;

import immerscale.application.entities.AccessToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessTokenRepository extends JpaRepository<AccessToken, String> {
}
