package immerscale.application.repositories;

import immerscale.application.entities.AccessToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccessTokenRepository extends JpaRepository<AccessToken, String> {

    @Query(value = "SELECT * FROM access_token WHERE project_id=?1", nativeQuery = true)
    @Transactional
    Iterable<AccessToken> getAccessTokens(Integer projectId);

}
