package com.smddev.chat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${websocket.config.endpoint}")
    private String ENDPOINT;
    @Value("${websocket.config.applicationDestinationPrefixes}")
    private String APPLICATION_DESTINATION_PREFIX;
    @Value("${websocket.config.stompBrokerRelay}")
    private String STOMP_BROKER_RELAY;
    @Value("${websocket.config.relayHost}")
    private String RELAY_HOST;
    @Value("${websocket.config.relayPort}")
    private Integer RELAY_PORT;
    @Value("${websocket.config.clientLogin}")
    private String LOGIN;
    @Value("${websocket.config.clientPasscode}")
    private String PASSWORD;


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint(ENDPOINT).withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes(APPLICATION_DESTINATION_PREFIX);
        registry.enableStompBrokerRelay(STOMP_BROKER_RELAY)
                .setRelayHost(RELAY_HOST)
                .setRelayPort(RELAY_PORT)
                .setClientLogin(LOGIN)
                .setClientPasscode(PASSWORD);
    }

}
