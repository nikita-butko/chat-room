package com.project.chat.service;

import com.project.chat.model.Message;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.Optional;

/**
 * Web socket event listener
 */
@Service
@Slf4j
@AllArgsConstructor
public class WebSocketEventListener {

    private SimpMessageSendingOperations messagingTemplate;

    /**
     * New connection event listener
     *
     * @param event the connection event
     */
    @EventListener
    public void handleConnect(SessionConnectedEvent event) {
        log.info("New connection");
    }

    /**
     * Disconnect event listener
     *
     * @param event the disconnection event
     */
    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        Map<String, Object> sessionAttributes = StompHeaderAccessor.wrap(event.getMessage()).getSessionAttributes();
        Optional<String> userName = Optional.of((String) sessionAttributes.get("username"));
        userName.ifPresent(this::disconnectUser);
    }

    private void disconnectUser(String username) {
        log.info(String.format("User %s disconnected", username));
        Message message = new Message();
        message.setMessageType(Message.MessageType.DISCONNECT);
        message.setSender(username);
        messagingTemplate.convertAndSend("/topic/public", message);
    }

}
