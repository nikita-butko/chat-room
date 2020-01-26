<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div id="chatForm" class="hidden">
    <div class="chat-form">

        <ul id="messages" class="chat-messages-area">

        </ul>

        <form id="sendForm">
            <div class="form-group">
                <input id="sendForm-input" type="text" placeholder="<spring:message code="chatForm.input.placeholder"/>" autocomplete="off" class="form-control" />
            </div>
            <div class="form-group">
                <button id="sendForm-button" type="submit" class="btn btn-lg btn-primary btn-block" > <spring:message code="chatForm.button"/> </button>
            </div>
        </form>

<%--        <div class="chat-user-area">--%>

<%--        </div>--%>

    </div>
</div>