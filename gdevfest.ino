/*

GND - white
clock - yellow - D9
strobe - orange - D8
data - black - D7

+5V - blue


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

 */

/*
Description:	Interfacing a NES controller with a PC with an Arduino.
Coded by:	Prodigity
Date:		1 December 2011
Revision:	V0.92 (beta)
*/

const int data  = 7;
const int latch = 8;
const int clock = 9;

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
  Serial.print(F("%1%{\"id\":"));
  Serial.print(output, DEC);
  Serial.println(F("}1%1"));
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

