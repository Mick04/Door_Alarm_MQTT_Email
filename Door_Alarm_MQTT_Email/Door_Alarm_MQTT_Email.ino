#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
//#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
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

///* Recipient's email*/
//#define RECIPIENT_EMAIL "mac5y4@talktalk.net"


//Session_Config config; // Declare config as a global variable
/* Callback function to get the Email sending status */

/******************************
   reset button replace with
   a button in a app on my
             Phone
 *******************************/
int resetBtn = D1;  // the number of the reset button pin
int magnetSwitch = D2;
const int ledr = D5;
const int ledg = D6;
const int ledb = D7;  // the number of the LED pin

int doorState;
int resetState;
int publishFlag = 0;
int flag = 0;
String message;
bool first_run = true;
bool mqttMessageReceived = false;  // Flag to indicate if an MQTT message has been received
//bool initialMessageReceived = true;
const long interval = 10000;  // interval at which to Time out (milliseconds)
unsigned long currentMillis = millis();
unsigned long previousMillis = currentMillis;  // will store last time LED was updated
bool red;
bool green;
bool blue;

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
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.println("] ");

  message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
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
    // Once connected, publish an announcement...
    //client.publish("outTopic", "hello world");
    client.subscribe("inTopic");
  } else {
    Serial.print("failed, rc=");
    Serial.print(client.state());
    Serial.println(" try again in 5 seconds");
    // Wait 5 seconds before retrying
    delay(5000);
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
  //WiFi.hostname(deviceName);  // DHCP Hostname (useful for finding device for static lease)
  WiFi.begin(ssid, password);
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }
  pinMode(BUILTIN_LED, OUTPUT);
  pinMode(ledr, OUTPUT);
  pinMode(ledg, OUTPUT);
  pinMode(ledb, OUTPUT);         // initialize the LED pin as an output:
  pinMode(magnetSwitch, INPUT);  // initialize the button pin as an input:resetBtn
  pinMode(resetBtn, INPUT);      // initialize the resetBtn as an input:


  /************************************
          OVER THE AIR START
  *                                  *
  ************************************/

  ArduinoOTA.setHostname("Door-Alarm");
  //ArduinoOTA.setHostname("TEMPLATE");
  //ArduinoOTA.setHostname("TEST RIG");
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
  if (doorState == 0 && flag == 0) {
    doorClosed();
    doorState = digitalRead(magnetSwitch);
    Serial.print("Loop doorState = ");
    Serial.println(doorState);
    delay(500);
    if (doorState == 1) {
      flag = 1;
    }
  } else if (doorState == 1 && flag == 1) {
    doorOpen();
  }
  if (flag == 2) {
    doorOpenTimeOut();
  }
}

void changeLedColour(int red, int green, int blue) {
  digitalWrite(ledr, red);    // if door is open
  digitalWrite(ledg, green);  // switch LED to
  digitalWrite(ledb, blue);   //    blue
}

void doorClosed() {
  red = 0;
  green = 1;
  blue = 0;
  changeLedColour(red, green, blue);
  currentMillis = millis();  // *********. reset the timer. *****
  previousMillis = currentMillis;
}


void doorOpen() {
  red = 0;
  green = 0;
  blue = 1;
  changeLedColour(red, green, blue);
  currentMillis = millis();

  doorState = digitalRead(magnetSwitch);
  if (doorState == 0) {
    flag = 0;
  }
  currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    //    **********    If door is open allow 10 minutes to shut door
    flag = 2;
    publishFlag = 1;
    Serial.println("line 245");
  }
}



void doorOpenTimeOut() {
  red = 1;
  green = 0;
  blue = 0;
  Serial.print("Befor publishFlag = ");
  Serial.println(publishFlag);
  delay(500);
  if (publishFlag == 1) {
    client.publish("outTopic", "3");
    publishFlag = 0;
    Serial.print("After publishFlag = ");
    Serial.println(publishFlag);
    Serial.println("line 55");
    delay(500);

    SendEmail("The door has been open for more than 10 minutes.", "Time out Subject"); //Edit with your message text
    delay(500);

  }
  changeLedColour(red, green, blue);
  doorState = digitalRead(magnetSwitch);
  if (resetState == 1 && doorState == 0) {
    flag = 0;
  }
}

/* Send an email */
void SendEmail(String htmlMsg, String MessageSubject)
{
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
  message.sender.name = F("ESP8266"); //edit with the name of the sender
  message.sender.email = AUTHOR_EMAIL;
  message.subject = MessageSubject;
  message.addRecipient(F("Mick"), F("mac5y4@talktalk.net")); //edit with the email address you are sending to

  message.html.content = htmlMsg;

  message.html.charSet = F("us-ascii");

  message.html.transfer_encoding = Content_Transfer_Encoding::enc_7bit;

  message.priority = esp_mail_smtp_priority::esp_mail_smtp_priority_normal;

  /* Connect to the server */
  if (!smtp.connect(&session /* session credentials */))
    Serial.println("Error connecting to SMTP server, " + smtp.errorReason());

  /* Start sending Email and close the session */
  if (!MailClient.sendMail(&smtp, &message))
  {
    Serial.println("Error sending Email, " + smtp.errorReason());
//    Serial.println("Turning on Red LED");
//    digitalWrite(redLED, HIGH); // turn the LED on
//    delay(10000); // Leave the LED on for 10 seconds
//    digitalWrite(redLED, LOW); // turn the LED off
  }
//  else
//  {
//    Serial.println("Turning on Green LED");
//    digitalWrite(greenLED, HIGH); // turn the LED on
//    delay(10000); // Leave the LED on for 10 seconds
//    digitalWrite(greenLED, LOW); // turn the LED off
//  }
}

/* Callback function to get the Email sending status */
void smtpCallback(SMTP_Status status)
{
  /* Print the current status */
  Serial.println(status.info());

  /* Print the sending result */
  if (status.success())
  {
    Serial.println("----------------");
    ESP_MAIL_PRINTF("Message sent success: %d\n", status.completedCount());
    ESP_MAIL_PRINTF("Message sent failed: %d\n", status.failedCount());
    Serial.println("----------------\n");

    for (size_t i = 0; i < smtp.sendingResult.size(); i++)
    {
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
