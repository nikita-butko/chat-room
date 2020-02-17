package com.project.chat.controller;

import com.project.chat.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

/**
 * Chat room main controller
 */
@Controller
public class ChatRoomController {

    /**
     * Method which transfer message from one user to others
     *
     * @param message the message for sending
     * @return the message for sending
     */
    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message message) {
        return message;
    }

    /**
     * Method which adds new user into the web socket session and sends message about that to others
     *
     * @param message        the message
     * @param headerAccessor the header accessor
     * @return the message
     */
    @MessageMapping("/connect")
    @SendTo("/topic/public")
    public Message connect(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        return message;
    }

}
