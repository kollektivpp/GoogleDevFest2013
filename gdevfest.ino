/*

---- CONTROLLER ----
GND - white
clock - yellow - D9
strobe - orange - D8
data - black - D7
+5V - blue
--------------------

---- BLUETOOTH -----
TX  - blue
RX  - brown
GND - orange
+3V - purple
--------------------

95 left
119 top
63 right
111 bottom

125 select
117 select + top
61  select + right
109 select + bottom
93  select + left

123 start
115 start + top
59  start + right
107 start + bottom
91  start + left

126 B
118 B + top
62  B + right
110 B + bottom
94  B + left

Description:  Interfacing a NES controller with a PC with an Arduino.
Coded by: Prodigity
Date:   1 December 2011
Revision: V0.92 (beta)
*/

const int data  = 7;
const int latch = 8;
const int clock = 9;

const int LED_red    = 3;
const int LED_green  = 4;
const int LED_yellow = 5;

#define latchlow digitalWrite(latch, LOW)
#define latchhigh digitalWrite(latch, HIGH)
#define clocklow digitalWrite(clock, LOW)
#define clockhigh digitalWrite(clock, HIGH)
#define dataread digitalRead(data)
#define wait delayMicroseconds(200)

byte output;

void setup() {
  Serial.begin(9600);
  pinMode(latch, OUTPUT);
  pinMode(clock, OUTPUT);
  pinMode(data, INPUT);
  pinMode(LED_red, OUTPUT);
  pinMode(LED_green, OUTPUT);
  pinMode(LED_yellow, OUTPUT);
}

void loop() {
  output = 0;
  ReadNESjoy();
  Serial.print(F("{\"id\":"));
  Serial.print(output, DEC);
  Serial.println(F("}"));

  if (output == 126 || output == 118 || output == 110 || output == 94 || output == 62) {
    digitalWrite(LED_red, HIGH);
  } else {
    digitalWrite(LED_red, LOW);
  }

  if (output == 125 || output == 117 || output == 109 || output == 93 || output == 61 || output == 123 || output == 115 || output == 107 || output == 91 || output == 59) {
    digitalWrite(LED_green, HIGH);
  } else {
    digitalWrite(LED_green, LOW);
  }

  if (output == 119 || output == 111 || output == 95 || output == 63) {
    digitalWrite(LED_yellow, HIGH);
  } else {
    digitalWrite(LED_yellow, LOW);
  }
   
  delay(50);
}


void ReadNESjoy() {
  latchlow;
  clocklow;
  latchhigh;
  wait;
  latchlow;
  for (int i = 0; i < 8; i++) {
     clockhigh;
     wait;
     output += dataread * (1 << i);
     clocklow;
     wait;
  }
}




