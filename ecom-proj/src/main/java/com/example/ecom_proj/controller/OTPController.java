package com.example.ecom_proj.controller;

import com.example.util.OTPGenerator;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Your React port
public class OTPController {

  
   @PostMapping("/send-otp")
   public ResponseEntity<Map<String, String>> sendOtp(@RequestBody Map<String, String> request, HttpSession session) {
    String username = request.get("username");
    String otp = OTPGenerator.generateOTP(5);

    // Store OTP in session
    session.setAttribute("otp", otp);

    // ✅ Simulate sending OTP to email/phone
    System.out.println("Sending OTP to " + username + ": " + otp); // log in server console

    Map<String, String> response = new HashMap<>();
    response.put("message", "OTP sent successfully");

    // ✅ FOR TESTING ONLY — include OTP in response
    response.put("otp", otp);

    return ResponseEntity.ok(response);
}



    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> request, HttpSession session) {
        String userInputOtp = request.get("otp");
        String sessionOtp = (String) session.getAttribute("otp");

        if (sessionOtp != null && sessionOtp.equals(userInputOtp)) {
            return Map.of("message", "OTP verified successfully");
        } else {
            return Map.of("message", "Invalid OTP");
        }
    }
}