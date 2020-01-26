<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>

<head>
    <c:import url="head.jsp"/>
</head>

<body class="background">

    <c:import url="header.jsp"/>

    <div id="usernameForm" class="container">
        <div class="welcome-form">
            <div class="form-group">
                <input id="usernameForm-input" name="username" type="text" class="form-control" placeholder="<spring:message code="start.username.placeholder"/>" autofocus="true"/>
            </div>
            <div class="form-group">
                <button id="usernameForm-button" class="btn btn-lg btn-primary btn-block" onclick="connect()"> <spring:message code="start.button"/> </button>
            </div>
        </div>
    </div>

    <div id="chatForm" class="hidden">
        <div class="chat-form">

        </div>
    </div>

    <c:import url="footer.jsp"/>
</body>
