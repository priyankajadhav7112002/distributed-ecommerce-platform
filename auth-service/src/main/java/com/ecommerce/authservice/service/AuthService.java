package com.ecommerce.authservice.service;

import com.ecommerce.authservice.dto.AuthResponse;
import com.ecommerce.authservice.dto.LoginRequest;
import com.ecommerce.authservice.dto.RegisterRequest;
import com.ecommerce.authservice.entity.User;
import com.ecommerce.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public String register(RegisterRequest request){

        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = User.builder()
                .username(request.username())
                .password(bCryptPasswordEncoder.encode(request.password()))
                .role(
                        request.role() == null
                                ? "USER"
                                : request.role().toUpperCase()
                )
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public AuthResponse login(LoginRequest request) {

        System.out.println("Username received = >" + request.username() + "<");

        userRepository.findAll().forEach(u -> {
            System.out.println(
                    "DB User = >" + u.getUsername() + "<"
            );
        });

        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("Password matches = "
                + bCryptPasswordEncoder.matches(request.password(), user.getPassword()));

        String token = jwtService.generateToken(user.getUsername(), user.getRole());

        return new AuthResponse(token);
    }
}
