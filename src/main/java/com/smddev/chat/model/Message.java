package com.smddev.chat.model;

import lombok.Data;

@Data
public class Message {

    private String content;
    private String sender;
    private MessageType messageType;

    public enum MessageType {
        CONNECT,
        CHAT,
        DISCONNECT
    }

}
