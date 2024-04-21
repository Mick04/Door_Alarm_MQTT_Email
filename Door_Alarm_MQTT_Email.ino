#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <ESP_Mail_Client.h>

/** The smtp host name e.g. smtp.gmail.com for GMail or smtp.office365.com for Outlook or smtp.mail.yahoo.com */
#define SMTP_HOST "smtp.gmail.com"
#define SMTP_PORT 465

/* The sign in credentials */
#define AUTHOR_EMAIL "esp82665y4@gmail.com"
#define AUTHOR_PASSWORD "pyhj nwif eruh dxdm"

/******************************
   reset button replace with
   a button in a app on my
             Phone
 *******************************/
// int resetBtn = D1;  // the number of the reset button pin
int magnetSwitch = D5;
const int ledr = D2;
const int ledg = D7;  //D2;
const int ledb = D1;  //D7;  // the number of the LED pin

// Define variables to store the state of the switches, LED colors, and timer
bool DoorState;
bool timerRunning = false;
bool timeOut = false;
bool closeBeforeTimeOut = true;
int resetState;
int publishFlag = 0;
int l00p = 0;  //delete after debug
String message;
bool first_run = true;
bool mqttMessageReceived = false;  // Flag to indicate if an MQTT message has been received
unsigned long previousMillis;
const long interval = 600000;  // 10 minute in milliseconds
unsigned long currentTime;

/********************************************
   Static IP address and wifi conection Start
 ********************************************/

// Set your Static IP address
IPAddress local_IP(192, 168, 1, 201);
// Set your Gateway IP address
IPAddress gateway(192, 168, 1, 1);

IPAddress subnet(255, 255, 0, 0);
IPAddress primaryDNS(8, 8, 8, 8);    //optional
IPAddress secondaryDNS(8, 8, 4, 4);  //optional
/***********************************************
      Static IP address and wifi conection end
 **********************************************/
//const char* deviceName = "Test_Rig";
/********************************************
          Your WiFi credentials.
                   Start
 ********************************************/

// char ssid[] = "Gimp_EXT";//outside board
char ssid[] = "Gimp";  // inside board
char password[] = "FC7KUNPX";
const char* mqtt_server = "public.mqtthq.com";
/********************************************
          Your WiFi credentials.
                   End
 ********************************************/

/********************************************
               setup MQTT client
                   Start
 **********************************************/

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];

/********************************************
               setup MQTT client
                     end
 **********************************************/

/********************************************
                  callback
                   Start
 ********************************************/
void callback(char* topic, byte* payload, unsigned int length) {

  message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  for (int i = 0; i < length; i++) {
    if (first_run) {
      first_run = false;
      resetState = 0;
    } else if (first_run == false) resetState = payload[i] - 48;
  }

  // Switch on the LED if an 1 was received as first character
  if (resetState == 0) {
    digitalWrite(BUILTIN_LED, LOW);  // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }
  mqttMessageReceived = true;
  delay(800);
}

/********************************************
                  callback
                     end
 ********************************************/

/********************************************
                 reconnect
                   Start
 ********************************************/
void reconnect() {
  // Create a random client ID
  String clientId = "ESP8266Client-";
  clientId += String(random(0xffff), HEX);
  // Attempt to connect
  if (client.connect(clientId.c_str())) {
    Serial.println("connected");
    client.subscribe("inTopic");
  } else {
    Serial.print("failed, rc=");
    Serial.print(client.state());
    Serial.println(" try again in 1 seconds");
    // Wait 1 seconds before retrying
    delay(1000);
  }
}

/********************************************
                 reconnect                  *
                   End                      *
 ********************************************/
/* Declare the global used SMTPSession object for SMTP transport */
SMTPSession smtp;

/* Callback function to get the Email sending status */
void smtpCallback(SMTP_Status status);

void setup() {

  Serial.begin(115200);
  delay(500);
  Serial.println("Booting");
  Serial.println("Booting");
  WiFi.config(local_IP, primaryDNS, gateway, subnet);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }
  pinMode(BUILTIN_LED, OUTPUT);
  pinMode(magnetSwitch, INPUT);
  pinMode(ledr, OUTPUT);
  pinMode(ledg, OUTPUT);
  pinMode(ledb, OUTPUT);


  /************************************
          OVER THE AIR START
  *                                  *
  ************************************/

  ArduinoOTA.setHostname("Door-Alarm");
  ArduinoOTA.onStart([]() {
    String type;
    if (ArduinoOTA.getCommand() == U_FLASH)
      type = "sketch";
    else  // U_SPIFFS
      type = "filesystem";

    // NOTE: if updating SPIFFS this would be the place to unmount SPIFFS using SPIFFS.end()
    Serial.println("Start updating " + type);
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  ArduinoOTA.begin();
  Serial.println("Ready");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  /************************************
          OVER THE AIR END
  ************************************/
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  /*  Set the network reconnection option */
  MailClient.networkReconnect(true);
}
void loop() {
  ArduinoOTA.handle();
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Read the state of the magnetic switch
  DoorState = digitalRead(magnetSwitch);
  l00p++;
  // if the door is closed and the timer isn't running
  if (DoorState == true && timerRunning == false) {  //if door is closed
    changeLedColour(0, 1, 0);  //.    change colour to green
  }

  // If door is open and timer not running change colour to blue
  // and start the timer
  if (DoorState == false && timerRunning == false) {

    //change LED to blue and Start the timer
    publishFlag = 1;
    timerRunning = true;
    currentTime = millis();     //Start
    previousMillis = millis();  //Timer

    changeLedColour(0, 0, 1);  //change LED colour to blue
  }
  // If door is open and the timer is running check timer
  if (DoorState == false && timerRunning == true && timeOut == false) {

    currentTime = millis();
    if (currentTime - previousMillis >= interval) {

      timeOut = true;
      changeLedColour(1, 0, 0);  //.   change colour to red
    }
  }

  if (timeOut == true) {

    // if door is closed call 'doorOpenTimeOut()'
    if (DoorState == true) {
  
      closeBeforeTimeOut = false;
      if (publishFlag == 1) {
        client.publish("inTopic", "3");
        publishFlag = 0;
 
        SendEmail("The door has been open for more than 10 minutes.", "Time out Subject");  //Edit with your message text
        delay(500);
      }
      // client.subscribe("inTopic");
      if (resetState == 1) {

        timeOut = false;
        timerRunning = false;
        closeBeforeTimeOut = true;
        changeLedColour(0, 1, 0);  //change LED colour to green
      }
    }
  }
  //if the door is shut before timeOut reset everything and change colour to green
  if (DoorState == true && timerRunning == true && closeBeforeTimeOut == true) {

    changeLedColour(0, 1, 0);  //change LED colour to green
    timerRunning = false;
  }
}
/* Send an email */
void SendEmail(String htmlMsg, String MessageSubject) {
  smtp.debug(3);

  /* Set the callback function to get the sending results */
  smtp.callback(smtpCallback);

  /* Declare the ESP_Mail_Session for user defined session credentials */
  ESP_Mail_Session session;

  /* Set the session config */
  session.server.host_name = SMTP_HOST;
  session.server.port = SMTP_PORT;
  session.login.email = AUTHOR_EMAIL;
  session.login.password = AUTHOR_PASSWORD;

  /* Set the NTP config time */
  session.time.ntp_server = F("pool.ntp.org,time.nist.gov");
  session.time.gmt_offset = -5;
  session.time.day_light_offset = 0;
  /* Declare the message class */
  SMTP_Message message;

  /* Set the message headers */
  message.sender.name = F("ESP8266");  //edit with the name of the sender
  message.sender.email = AUTHOR_EMAIL;
  message.subject = MessageSubject;
  message.addRecipient(F("Mick"), F("mac5y4@talktalk.net"));  //edit with the email address you are sending to

  message.html.content = htmlMsg;

  message.html.charSet = F("us-ascii");

  message.html.transfer_encoding = Content_Transfer_Encoding::enc_7bit;

  message.priority = esp_mail_smtp_priority::esp_mail_smtp_priority_normal;

  /* Connect to the server */
  if (!smtp.connect(&session /* session credentials */))
    Serial.println("Error connecting to SMTP server, " + smtp.errorReason());

  /* Start sending Email and close the session */
  if (!MailClient.sendMail(&smtp, &message)) {
    Serial.println("Error sending Email, " + smtp.errorReason());
  }

}

/* Callback function to get the Email sending status */
void smtpCallback(SMTP_Status status) {
  /* Print the current status */
  Serial.println(status.info());

  /* Print the sending result */
  if (status.success()) {
    Serial.println("----------------");
    ESP_MAIL_PRINTF("Message sent success: %d\n", status.completedCount());
    ESP_MAIL_PRINTF("Message sent failed: %d\n", status.failedCount());
    Serial.println("----------------\n");

    for (size_t i = 0; i < smtp.sendingResult.size(); i++) {
      /* Get the result item */
      SMTP_Result result = smtp.sendingResult.getItem(i);
      ESP_MAIL_PRINTF("Message No: %d\n", i + 1);
      ESP_MAIL_PRINTF("Status: %s\n", result.completed ? "success" : "failed");
      ESP_MAIL_PRINTF("Recipient: %s\n", result.recipients.c_str());
      ESP_MAIL_PRINTF("Subject: %s\n", result.subject.c_str());
    }
    Serial.println("----------------\n");

    // You need to clear sending result as the memory usage will increase.
    smtp.sendingResult.clear();
  }
}

void changeLedColour(int red, int green, int blue) {
  digitalWrite(ledr, red);    // if door is open
  digitalWrite(ledg, green);  // switch LED to
  digitalWrite(ledb, blue);   //    blue
}

