import serial, time, datetime, sys

SERIALPORT = "/dev/ttyUSB0"    # the com/serial port the XBee is connected to, the pi GPIO should always be ttyAMA0
BAUDRATE = 9600      # the baud rate we talk to the xbee

ser = serial.Serial(SERIALPORT, BAUDRATE)


ser.write(str.encode("~")) # "-" skips the fix for the GPS
time.sleep(1)
ser.write(str.encode("+")) # telemetry module will not transmit data until "+" is sent

# Continuously read and print packets
while True:
    incoming = ser.readline().strip()
    print(incoming)

ser.close()

