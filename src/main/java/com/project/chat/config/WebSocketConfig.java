package com.project.chat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Web socket configuration class
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${websocket.config.endpoint}")
    private String endpoint;
    @Value("${websocket.config.applicationDestinationPrefixes}")
    private String applicationDestinationPrefix;
    @Value("${websocket.config.stompBrokerRelay}")
    private String stompBrokerRelay;
    @Value("${websocket.config.relayHost}")
    private String relayHost;
    @Value("${websocket.config.relayPort}")
    private Integer relayPort;
    @Value("${websocket.config.clientLogin}")
    private String login;
    @Value("${websocket.config.clientPasscode}")
    private String password;


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint(endpoint).withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes(applicationDestinationPrefix);
        registry.enableStompBrokerRelay(stompBrokerRelay)
                .setRelayHost(relayHost)
                .setRelayPort(relayPort)
                .setClientLogin(login)
                .setClientPasscode(password);
    }

}
