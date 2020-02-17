package com.project.chat.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

/**
 * Chat room rest controller
 */
@RestController
@AllArgsConstructor
public class ChatRoomRestController {

    private Set<String> usernameSet = new HashSet<>();

    /**
     * Gets username set
     *
     * @return the username set
     */
    @GetMapping("/users")
    public Set<String> getUsernameSet() {
        return usernameSet;
    }

    /**
     * Add new user.
     *
     * @param username the username
     * @return the response entity with HttpStatus.OK if the user is new, or HttpStatus.BAD_REQUEST if the user with the same username is already in chat
     */
    @PostMapping("/users/add")
    public ResponseEntity<Boolean> addNewUser(@RequestParam String username) {
        if(usernameSet.contains(username)) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        } else {
            usernameSet.add(username);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
    }

    /**
     * Delete user.
     *
     * @param username the username
     */
    @PostMapping("/users/delete")
    public void deleteUser(@RequestParam String username) {
        usernameSet.remove(username);
    }
}
