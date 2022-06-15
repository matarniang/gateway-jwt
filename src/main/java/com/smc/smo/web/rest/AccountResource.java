package com.smc.smo.web.rest;
import com.smc.smo.service.UserService;
import com.smc.smo.service.dto.AdminUserDTO;
import java.security.Principal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import reactor.core.publisher.Mono;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    @Autowired
    private RestTemplate restTemplate;
    private static class AccountResourceException extends RuntimeException {
        private static final long serialVersionUID = 1L;
        private AccountResourceException(String message) {
            super(message);
        }
    }
    private final Logger log = LoggerFactory.getLogger(AccountResource.class);
    private final UserService userService;
    public AccountResource(UserService userService) {
        this.userService = userService;
    }

    /**
     * {@code GET  /account} : get the current user.
     *
     * @param principal the current user; resolves to {@code null} if not authenticated.
     * @return the current user.
     * @throws AccountResourceException {@code 500 (Internal Server Error)} if the user couldn't be returned.
     */
    @GetMapping("/account")
    @SuppressWarnings("unchecked")
    public Mono<AdminUserDTO> getAccount(Principal principal) {
        if (principal instanceof AbstractAuthenticationToken) {
            return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal);
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }

    /**
     * {@code POST  /authenticate-mobile} : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request.
     * @return the login if the user is authenticated.
     */
    @PostMapping("/authenticate-mobile")
    public ResponseEntity<String> authenticatedWeb(@RequestBody String req) {
        JSONObject object = new JSONObject(req);
        String username = object.getString("username");
        String password = object.getString("password");
        return this.loginKeycloak(username, password);
    }

    private ResponseEntity<String> loginKeycloak(String username, String password) {
        var accesToken = new ResponseEntity<>("KO",HttpStatus.BAD_REQUEST);
        var headers = new HttpHeaders();
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED.toString());
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        log.info("**** username et password  **** " + username + " " + password);
        map.add("client_id", "web_app");
        map.add("client_secret", "web_app");
        map.add("grant_type", "password");
        map.add("username", username);
        map.add("password", password);
        var entity = new HttpEntity<>(map, headers);
        try {
            var result = restTemplate.postForEntity(
                "http://keycloak:9080/auth/realms/jhipster/protocol/openid-connect/token",
                entity,
                ResponseToken.class
            );
            if ((result.getStatusCode() == HttpStatus.OK) && (result.getBody() != null)) {
                var responseToken = result.getBody();
                accesToken = (responseToken == null) ? new ResponseEntity<>("KO", headers, HttpStatus.BAD_REQUEST) : new ResponseEntity<>(responseToken.getAccess_token(), headers, HttpStatus.OK);
            }
        } catch (HttpClientErrorException httpClErrorEx) {
            accesToken = new ResponseEntity<>("KO", headers, HttpStatus.BAD_REQUEST);
        }
        return accesToken;
    }
    
    /**
     * {@code GET  /sendMailer} : sendMail the current user .
     *
     */
    @GetMapping("/sendMailer")
    @SuppressWarnings("unchecked")
    public void SendGMailTLS() {
      // Recipient's email ID needs to be mentioned.
      String to = "balloniang415@gmail.com";//change accordingly
      // Sender's email ID needs to be mentioned
      String from = "balloniang415@gmail.com";//change accordingly
      final String username = "balloniang415@gmail.com";//change accordingly
      final String password = "iqsrsrxqhmvehkde";//change accordingly
      // GMail's SMTP server
      String host = "smtp.gmail.com";
      Properties props = new Properties();
      props.put("mail.smtp.auth", "true");
      props.put("mail.smtp.starttls.enable", "true");
      props.put("mail.smtp.host", host);
      props.put("mail.smtp.port", "587");
      props.put("mail.smtp.ssl.trust", host);
      // Get the Session object.
      Session session = Session.getInstance(props,
      new javax.mail.Authenticator() {
         protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(username, password);
         }
      });

      try {
         // Create a default MimeMessage object.
         Message message = new MimeMessage(session);
         // Set From: header field of the header.
         message.setFrom(new InternetAddress(from));
         // Set To: header field of the header.
         message.setRecipients(Message.RecipientType.TO,
         InternetAddress.parse(to));
         // Set Subject: header field
         message.setSubject("Gmail - Email Test");
         // Now set the actual message
         message.setText("Hello, this is sample email to check/send "
            + "email using JavaMailAPI from GMAIL");
         // Send message
         Transport.send(message);
         System.out.println("Sent message successfully.... from GMAIL");
      } catch (MessagingException e) {
            throw new RuntimeException(e);
      }
    }

}