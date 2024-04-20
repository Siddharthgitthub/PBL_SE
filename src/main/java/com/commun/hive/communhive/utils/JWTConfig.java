package com.commun.hive.communhive.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.ByteBuffer;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.Base64;

@Component
public class JWTConfig {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationInMS}")
    private int jwtExpirationInMS;

    private static byte[] uuidToBytes(UUID uuid) {
        long mostSignificantBits = uuid.getMostSignificantBits();
        long leastSignificantBits = uuid.getLeastSignificantBits();
        ByteBuffer byteBuffer = ByteBuffer.allocate(16);
        byteBuffer.putLong(mostSignificantBits);
        byteBuffer.putLong(leastSignificantBits);
        return byteBuffer.array();
    }

    private static UUID bytesToUUID(byte[] bytes) {
        ByteBuffer byteBuffer = ByteBuffer.wrap(bytes);
        long mostSignificantBits = byteBuffer.getLong();
        long leastSignificantBits = byteBuffer.getLong();
        return new UUID(mostSignificantBits, leastSignificantBits);
    }

    private static String getUUIDFromBase64(String base64Secret) {
        byte[] bytes = Base64.getDecoder().decode(base64Secret);
        UUID uuid = bytesToUUID(bytes);
        return uuid.toString();
    }

    private static String getBase64Secret(String key) {
        UUID uuid = UUID.fromString(key);
        byte[] bytes = uuidToBytes(uuid);
        return Base64.getEncoder().encodeToString(bytes);
    }

    // Method to retrieve the signing key from the secret string
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Method to generate a JWT token
    public String generate(String username, Object details) {
        return Jwts.builder().issuer("service").subject(username) // Add Subject
                .audience().add(username).and() // Configuring audience
                .issuer(username) // Use claim instead of setSubject
                .claim("details", details)
                .issuedAt(new Date()) // Setting issued time
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationInMS)) // Setting expiration time
                .id(UUID.randomUUID().toString()) // Setting a unique ID
                .signWith(this.getSigningKey()) // Signing the token
                .compact();
    }

    // Method to validate a JWT token
    public boolean validate(String token) {
        try {
            Jwts.parser().verifyWith(this.getSigningKey()).build().parseSignedClaims(token);
            return true;
        } catch (SignatureException e) {
            // Invalid JWT signature
        } catch (MalformedJwtException e) {
            // Invalid JWT token
        } catch (ExpiredJwtException e) {
            // JWT token is expired
        } catch (UnsupportedJwtException e) {
            // JWT token is unsupported
        } catch (IllegalArgumentException e) {
            // JWT claims string is empty
        }
        return false;
    }

    // Method to extract the username from a JWT token
    public String getUsername(String token) {
        return Jwts.parser().verifyWith(this.getSigningKey()).build().parseSignedClaims(token).getPayload().getSubject();
    }

    // Method to extract user details from a JWT token
    public Map<String, Object> getUserDetails(String token) {
        return (Map<String, Object>) Jwts.parser().verifyWith(this.getSigningKey()).build().parseSignedClaims(token).getBody().get("details");
    }
}