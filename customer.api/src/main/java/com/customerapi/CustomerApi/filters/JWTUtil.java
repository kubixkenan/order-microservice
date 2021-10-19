package com.customerapi.CustomerApi.filters;

import java.util.Date;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;


@Service
public class JWTUtil {

    private String SECRET_KEY = "MytodoModoJWTKey123!";

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUsername(String token) {
        return token;
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Claims extractAllClaims(String token) {
        var body = Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(token).getBody();
        return body;
    }

    public Boolean validateToken(String token) {        
        return (!isTokenExpired(token));
    }
}