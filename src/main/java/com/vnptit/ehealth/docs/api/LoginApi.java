package com.vnptit.ehealth.docs.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.vnptit.ehealth.docs.entities.UserEntity;
import com.vnptit.ehealth.docs.jwt.JwtTokenProvider;
import com.vnptit.ehealth.docs.model.BaseResponse;
import com.vnptit.ehealth.docs.model.LoginRequest;
import com.vnptit.ehealth.docs.model.LoginResponse;
import com.vnptit.ehealth.docs.security.CustomUserDetails;
import com.vnptit.ehealth.docs.security.UserService;
import com.vnptit.ehealth.docs.service.BaseService;

@RestController
@CrossOrigin
@RequestMapping("/public")
public class LoginApi {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    @CrossOrigin
    public LoginResponse login(@RequestBody LoginRequest loginRequest){

        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
//        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());

        return new LoginResponse(jwt);

    }



}
