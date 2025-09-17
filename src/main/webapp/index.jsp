 <%@ page contentType="text/html;charset=UTF-8" language="java" %>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 <!DOCTYPE html>
 <html lang="en">
 <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Java Web Application</title>
    <link rel="stylesheet" href="css/style.css">
 </head>
 <body>
    <div class="container">
        <header class="header">
            <h1>Welcome to My Java Web Application</h1>
            <p class="subtitle">Built with Java Servlets, JSP, HTML, and CSS</p>
        </header>
        
        <main class="main-content">
            <div class="card">
                <h2>Application Features</h2>
                <ul>
                    <li>✅ Java Servlet backend</li>
                    <li>✅ Dynamic JSP pages</li>
                    <li>✅ Responsive CSS styling</li>
                    <li>✅ Interactive JavaScript</li>
                </ul>
            </div>
            
            <div class="card">
                <h2>Try the Servlet</h2>
                <form action="hello" method="get" class="form">
                    <label for="name">Enter your name:</label>
 
                    <input type="text" id="name" name="name" placeholder="Your name here.">
                    <button type="submit" class="btn btn-primary">Say Hello!</button>
                </form>
            </div>
            
            <div class="card">
                <h2>Current Information</h2>
                <p><strong>Server Time:</strong> <%= new java.util.Date() %></p>
                <p><strong>Session ID:</strong> <%= session.getId() %></p>
                <p><strong>Context Path:</strong> <%= request.getContextPath() %></p>
            </div>
        </main>
        
        <footer class="footer">
            <p>&copy; 2024 My Java Web Application. All rights reserved.</p>
        </footer>
    </div>
    
    <script src="js/script.js"></script>
 </body>
 </html>