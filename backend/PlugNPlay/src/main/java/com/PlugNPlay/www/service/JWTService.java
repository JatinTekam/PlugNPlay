package com.PlugNPlay.www.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

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


        if(secret==null && secret.length()<64){
            throw new IllegalArgumentException("Invalid secret");
        }


        this.accessTTLSecond = accessTTLSecond;
        this.refreshTTLSecond = refreshTTLSecond;
        this.issuer = issuer;
    }
}
