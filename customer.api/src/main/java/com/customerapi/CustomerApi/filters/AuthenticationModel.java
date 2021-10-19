package com.customerapi.CustomerApi.filters;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class AuthenticationModel implements Authentication {

    private Boolean _isValid = false;

    public AuthenticationModel(Boolean isValid) {
        _isValid = isValid;
    }

    @Override
    public String getName() {        
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {        
        return null;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }

    @Override
    public boolean isAuthenticated() {
        return _isValid;
    }

    @Override
    public void setAuthenticated(boolean arg0) throws IllegalArgumentException {
        
    }
}
