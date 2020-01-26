package com.smddev.chat.model;

import lombok.Data;

/**
 * Base message class
 */
@Data
public class Message {

    private String content;
    private String sender;
    private MessageType messageType;

    /**
     * Message type
     */
    public enum MessageType {
        CONNECT,
        CHAT,
        DISCONNECT
    }

}
