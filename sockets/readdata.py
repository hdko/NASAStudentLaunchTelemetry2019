import serial
import csv
import time
import sys
from datetime import datetime


filename = "./data/{}.txt".format(datetime.now().strftime("%Y-%m-%d_%H:%M:%S"))

SERIALPORT = "/dev/ttyUSB0"
BAUDRATE = 9600

ser = serial.Serial(SERIALPORT, BAUDRATE)

ser.write(str.encode("~")) # "-" skips the fix for the GPS
time.sleep(1)
ser.write(str.encode("+")) # telemetry module will not transmit data until "+" is sent

while True:
    try:
        incoming = ser.readline().strip().decode("utf-8")
        print (incoming)
        sys.stdout.flush()

    except serial.serialutil.SerialException:
        pass

    except UnicodeDecodeError:
        print("warning: UnicodeDecodeError")
        pass

    except Exception as error:
        print("TERMINATED, " + str(error))
        sys.stdout.flush()
        ser.close()
        break
