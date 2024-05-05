package immerscale.application.helper;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

// implemented as singleton
public class AESEncrypter {
    private static AESEncrypter instance = null;
    private SecretKey secretKey;
    private IvParameterSpec initializationVector;


    private AESEncrypter() throws NoSuchAlgorithmException {
        // generate symmetric key
        secretKey = KeyGenerator.getInstance("AES").generateKey();

        // generate initialization vector
        byte[] initializationVector = new byte[16];
        new SecureRandom().nextBytes(initializationVector);
        this.initializationVector = new IvParameterSpec(initializationVector);

    }

    public static AESEncrypter getInstance() throws NoSuchAlgorithmException {
        if (instance == null) {
            instance = new AESEncrypter();
        }
        return instance;
    }

    public String encrypt(String plaintext) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        // encrypt plaintext using secretKey and initializationVector

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, initializationVector);

        byte[] encrypted = cipher.doFinal(plaintext.getBytes());

        return Base64.getEncoder().encodeToString(encrypted);
    }

    public String decrypt(String ciphertext) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        // decrypt ciphertext using secretKey and initializationVector

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey, initializationVector);

        byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
        return new String(decrypted);
    }

}