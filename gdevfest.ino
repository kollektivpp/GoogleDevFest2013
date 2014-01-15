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
122 B + start
124 B + select

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
}

void loop() {
  output = 0;
  ReadNESjoy();

  if (output != 127) {
    Serial.print(F("{\"id\":"));
    Serial.print(output, DEC);
    Serial.println(F("}"));
  }

  digitalWrite(13, HIGH);
  delay(50);
  digitalWrite(13, LOW);
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




