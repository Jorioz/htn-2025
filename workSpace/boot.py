from machine import Pin
import socket  
import network

import esp
esp.osdebug(None)

ssid = 'HackTheNorth'
password = 'HTN2025!'

station = network.WLAN(network.STA_IF)

station.active(True)
station.connect(ssid, password)

while station.isconnected() == False:
  pass

print('Connection successful')
print(station.ifconfig())

led = Pin(21, Pin.OUT)
l = Pin(2, Pin.OUT)
led21 = Pin(21, Pin.OUT)
led22 = Pin(22, Pin.OUT)

