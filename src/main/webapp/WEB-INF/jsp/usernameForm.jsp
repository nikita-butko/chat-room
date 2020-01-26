<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div id="usernameForm" class="container">
    <div class="welcome-form">
        <form id="usernameForm-form">
            <div class="form-group">
                <input id="usernameForm-input" name="username" type="text" class="form-control" placeholder="<spring:message code="start.username.placeholder"/>" autofocus="true"/>
            </div>
            <div class="form-group">
                <button id="usernameForm-button" type="submit" class="btn btn-lg btn-primary btn-block"> <spring:message code="start.button"/> </button>
            </div>
        </form>
    </div>
</div>