package com.PlugNPlay.www.service;

import com.PlugNPlay.www.entity.Role;
import com.PlugNPlay.www.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecureDigestAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class JWTService {

    private final SecretKey key;

    private final long accessTTLSecond;

    private final long refreshTTLSecond;

    private final String issuer;

    public JWTService(@Value("${security.jwt.secret}") String secret,
                      @Value("${security.jwt.access-ttl-seconds}") long accessTTLSecond,
                      @Value("${security.jwt.refresh-ttl-seconds}") long refreshTTLSecond,
                      @Value("${security.jwt.issuer}") String issuer) {


        if(secret==null && secret.length()<25){
            throw new IllegalArgumentException("JWT secret must be at least 64 characters");
        }

        this.key= Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTTLSecond = accessTTLSecond;
        this.refreshTTLSecond = refreshTTLSecond;
        this.issuer = issuer;
    }


    //Generate Token
    public String generateAccessToken(User user){
        Instant now=Instant.now();

        List<String> roles= user.getRoles() == null ? List.of() :
                user.getRoles().stream().map(Role::getName).toList();

       return Jwts.builder()
                .id(UUID.randomUUID().toString())
                .subject(user.getId().toString())
                .issuer(issuer)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(accessTTLSecond)))
                .claims(Map.of(
                        "email", user.getEmail(),
                        "roles", roles,
                        "typ", "access"
                ))
                .signWith(key,SignatureAlgorithm.HS256)
                .compact();
    }


    //Refresh Token
    public String generateRefreshToken(User user,String jti){
        Instant now=Instant.now();
        return Jwts.builder()
                .id(jti)
                .subject(user.getId().toString())
                .issuer(issuer)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(refreshTTLSecond)))
                .claim("typ","refresh")
                .signWith(key,SignatureAlgorithm.HS256)
                .compact();
    }


    //Parse JWT Token
    public Jws<Claims> parse(String token){
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
    }

    public boolean isAccessToken(String token){
        Claims c=parse(token).getPayload();
        return "access".equals(c.get("typ"));
    }

    public boolean isRefreshToken(String token){
        Claims c=parse(token).getPayload();
        return "refresh".equals(c.get("typ"));
    }


    public UUID getUserId(String token){
        Claims c=parse(token).getPayload();
        return UUID.fromString(c.getSubject());
    }

    public String getJti(String token){
        return parse(token).getPayload().getId();
    }

    public List<String> getRoles(String token){
        Claims c=parse(token).getPayload();
        return (List<String>) c.get("roles");
    }


    public String getEmail(String token){
        Claims c=parse(token).getPayload();
        return (String) c.get("email");
    }


    public long getAccessTTLSecond() {
        return accessTTLSecond;
    }

    public long getRefreshTTLSecond() {
        return refreshTTLSecond;
    }







}
