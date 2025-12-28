package com.PlugNPlay.www.service;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

    private final String refreshTokenCookieName;
    private final boolean cookieSecure;
    private final boolean cookieHttpOnly;
    private final String cookieDomain;
    private final String cookieSameSite;

    public CookieService(
            @Value("${security.jwt.refresh-token-cookie-name}") String refreshTokenCookieName,
            @Value("${security.jwt.cookie-secure}")boolean cookieSecure,
            @Value("${security.jwt.cookie-http-only}")boolean cookieHttpOnly,
            @Value("${security.jwt.cookie-domain}")String cookieDomain,
            @Value("${security.jwt.cookie-same-site}")String cookieSameSite) {
        this.refreshTokenCookieName = refreshTokenCookieName;
        this.cookieSecure = cookieSecure;
        this.cookieHttpOnly = cookieHttpOnly;
        this.cookieDomain = cookieDomain;
        this.cookieSameSite = cookieSameSite;
    }


    //Attach Cookie In Header
    public void attachRefreshCookie(HttpServletResponse response, String value, int maxAge){

        var responseCookieBuilder = ResponseCookie.from(refreshTokenCookieName, value)
                .httpOnly(cookieHttpOnly)
                .secure(cookieSecure)
                .path("/")
                .maxAge(maxAge)
                .sameSite(cookieSameSite);

        if(cookieDomain!=null && !cookieDomain.isBlank()){
            responseCookieBuilder.domain(cookieDomain);
        }

        ResponseCookie responseCookie = responseCookieBuilder.build();
        response.addHeader(HttpHeaders.SET_COOKIE,responseCookie.toString());
    }


    //Clear Refresh Token
    public void clearRefreshCookie(HttpServletResponse response){

        ResponseCookie.ResponseCookieBuilder builder=ResponseCookie.from(refreshTokenCookieName,"")
                .maxAge(0)
                .httpOnly(cookieHttpOnly)
                .path("/")
                .sameSite(cookieSameSite)
                .secure(cookieSecure);

        if(cookieDomain!=null && !cookieDomain.isBlank()){
            builder.domain(cookieDomain);
        }

        ResponseCookie responseCookie = builder.build();
        response.addHeader(HttpHeaders.SET_COOKIE,responseCookie.toString());

    }


    public void addNoStoreHeader(HttpServletResponse response){
        response.setHeader(HttpHeaders.CACHE_CONTROL,"no-store");
        response.setHeader("Pragma","no-store");
    }

    public String getRefreshTokenCookieName() {
        return refreshTokenCookieName;
    }

    public boolean isCookieSecure() {
        return cookieSecure;
    }

    public boolean isCookieHttpOnly() {
        return cookieHttpOnly;
    }

    public String getCookieDomain() {
        return cookieDomain;
    }

    public String getCookieSameSite() {
        return cookieSameSite;
    }
}
