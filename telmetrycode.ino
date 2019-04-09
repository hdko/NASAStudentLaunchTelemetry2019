#include <SPI.h>
#include <SD.h>
#include <Streaming.h>
#include <PString.h>
#include <Time.h>
#include <TimeLib.h>
#include <SparkFunCCS811.h>
#include <SparkFunBME280.h>
#include <Adafruit_BNO055.h>
#include <Adafruit_GPS.h>
#include <SoftTimers.h>

#define MAX_BUFFER 256
uint8_t decoded_buffer[MAX_BUFFER];

enum State {WAIT, ARM, RUN, READY, SHUTDOWN, ERR};
State state = WAIT;

char c, d;

const PROGMEM char starman[] = {"Starman:d=8,o=6,b=100:g5,a5,2f5,2f,e,d,c,d,4c,p,d,e,d,c,d,c,d,c,d,e,d,c,d,4c,g5,a5,2f5,2f,e,d,c,d,4c,p,d,e,d,c,d,c,d,c,d,e,d,e,f,4g"};
const PROGMEM char finalCountdown[] = {"FinalCou:d=4,o=5,b=125:p,8p,16b,16a,b,e,p,8p,16c6,16b,8c6,8b,a,p,8p,16c6,16b,c6,e,p,8p,16a,16g,8a,8g,8f#,8a,g.,16f#,16g,a.,16g,16a,8b,8a,8g,8f#,e,c6,2b.,16b,16c6,16b,16a,1b"};

/*--------Variables-------*/
const uint32_t PAYLOAD_BAUD = 9600;
const uint32_t XBEE_BAUD = 9600;
const uint16_t PAYLOAD_INTR = 1000;
const uint16_t PAYLOAD_TIMEOUT = 500;
const uint16_t PAYLOAD_INIT_TIMEOUT = 1000;
const int8_t OFFSET_TIME = -6;
const char DELIMITER[] = ",";

// Buzzer
const uint8_t BUZZER_PIN = LED_BUILTIN;

// SD Card Data
const uint8_t SELECT_SLVE = 53;

//Adafruit GPS Variables
bool GPS_SKIP = false;
const uint16_t ADAGPS_BAUD = 9600;
const uint16_t ADAGPS_INTR = 2000;

//Adafruit BNO055 Variables
const uint16_t BNO055_INTR = 50;

//Sparkfun BME280 Variables
const uint16_t BME280_INTR = 50;
const uint8_t BME280_ADDR = 0x77;
const uint8_t BME280_MODE = 3;
const uint8_t BME280_STBY = 0;
const uint8_t BME280_FITR = 4;
const uint8_t BME280_TMPO = 2;
const uint8_t BME280_PRSO = 5;
const uint8_t BME280_HMDO = 1;

//Sparkfun CCS811 Variables
const uint16_t CCS811_INTR = 5000;
const uint8_t CCS811_ADDR = 0x5B;

//Photodiode Variables
const int16_t PHOTODIODE_PIN = A0;
const uint16_t PHOTODIODE_INTR = 1000;
int32_t photoreadout = 0;

/* -------- Program Pre-Initiation -------- */
uint32_t START_TIME, START_TIME_GPS;
SoftTimer timerGPS;
SoftTimer timerBME;
SoftTimer timerBNO;
SoftTimer timerCCS;
SoftTimer timerPAYLOAD;
SoftTimer timerPHOTODIODE;
SoftTimer timeoutPAYLOAD;
SoftTimer timeoutINIT;

// SD Pre-Initiation
File logfile;

//Adafruit GPS Pre-Initiation
Adafruit_GPS GPS(&Serial3);

//Adafruit BNO055 Pre-Initiation
Adafruit_BNO055 bno = Adafruit_BNO055();

//Sparkfun BME280 Pre-Initiation
BME280 atmoSense;

// Sparkfun CCS811 Pre-Initiation
CCS811 airqSense(CCS811_ADDR);

//Master Functions
void initAll() {
  Serial.begin(PAYLOAD_BAUD);
  Serial1.begin(XBEE_BAUD);

  pinMode(BUZZER_PIN, OUTPUT);

  timerPAYLOAD.setTimeOutTime(PAYLOAD_INTR);
  timeoutPAYLOAD.setTimeOutTime(PAYLOAD_TIMEOUT);
  timerPHOTODIODE.setTimeOutTime(PHOTODIODE_INTR);
  timeoutINIT.setTimeOutTime(PAYLOAD_INIT_TIMEOUT);

  while (!Serial) {
    /*Wait for Serial to connect*/
  };
  while (!Serial1) {
    /*Wait for XBee Serial to connect*/
  };
  while (!Serial3) {
    /* Wait for GPS Serial to connect*/
  }

  Serial1 << endl << "# Initializing" << endl;

  initSD ();
  Serial1 << "# SD Initialized" << endl;

  initGPS();
  Serial1 << "# GPS Initialized" << endl;

  initBNO();
  Serial1 << "# BNO Initialized" << endl;

  initBME();
  Serial1 << "# BME Initialized" << endl;

  initCCS();
  Serial1 << "# CCS Initialized" << endl;
}

// SD Stuff
void initSD() {
  if (!SD.begin(SELECT_SLVE)) {
    return;
  }

  char filename[] = "FLIGHT00.CSV";
  for (uint8_t i = 0; i < 100; i++) {
    filename[6] = i / 10 + '0';
    filename[7] = i % 10 + '0';
    if (!SD.exists(filename)) {
      logfile = SD.open(filename, FILE_WRITE);
      break;
    }
  }

  if (! logfile) {
    return;
  }

  Serial1 << "# Logging to: " << filename << endl;
}

// Time Stuff
void initTime() {
  START_TIME = millis();
  START_TIME_GPS = getTime();

  Serial1 << "# Initialized GPS Time (ms): " << START_TIME_GPS << endl;
  Serial1 << "# Initialized Millis Start Time (ms): " << START_TIME << endl;
  Serial1 << "# Initalization Time (ms): " << millis() << endl;

  timerGPS.reset();
  timerBME.reset();
  timerBNO.reset();
  timerCCS.reset();
  timerPAYLOAD.reset();
  timerPHOTODIODE.reset();
  timeoutPAYLOAD.reset();
  timeoutINIT.reset();
}

PString getTimestamp(uint16_t memSize = 50, bool serialPrint = false, bool sdPrint = true, bool xbeePrint = true) {
  uint32_t elapsedTime = millis() - START_TIME;
  uint32_t inputMillis = elapsedTime + START_TIME_GPS;

  uint16_t hours = inputMillis / 3600000;
  inputMillis -= (3600000 * hours);

  uint8_t minutes = inputMillis / 60000;
  inputMillis -= (60000 * minutes);

  uint8_t seconds = inputMillis / 1000;
  inputMillis -= (1000 * seconds);

  char buffer[memSize];
  PString dataTime(buffer, sizeof(buffer));

  dataTime << hours << ":" << minutes << ":" << seconds << "."
           << inputMillis << DELIMITER << elapsedTime;

  return dataTime;
}

uint32_t getTime() {
  prepareParseGPS();
  uint16_t milliseconds = GPS.milliseconds;
  uint8_t days = GPS.day;
  uint8_t seconds = GPS.seconds;
  uint8_t minutes = GPS.minute;
  int8_t hours = GPS.hour + OFFSET_TIME;

  if (hours < 0) {
    hours = 24 + hours;
    days -= 1;
  }
  if (hours > 23) {
    hours = 24 - hours;
    days += 1;
  }

  setTime(hours, minutes, seconds, days, GPS.month, GPS.year + 2000);
  Serial1 << "# Date (mm/dd/yyyy): " << month() << "/" << day() << "/" << year() << endl;
  return ((hours * 3600000) + (minutes * 60000) + (seconds * 1000) + milliseconds);
}

// GPS Stuff
void initGPS() {
  GPS.begin(ADAGPS_BAUD);
  GPS.sendCommand(PMTK_SET_NMEA_OUTPUT_RMCGGA);
  GPS.sendCommand(PMTK_SET_NMEA_UPDATE_1HZ);
  GPS.sendCommand(PGCMD_ANTENNA);

  delay(1000);
  Serial3.println(PMTK_Q_RELEASE);
  timerGPS.setTimeOutTime(ADAGPS_INTR);
}

void prepareParseGPS(){
   char g = GPS.read();
   //Serial.write(g);
   if (GPS.newNMEAreceived()) {
     if (!GPS.parse(GPS.lastNMEA())) {
        return;
     }
  }
}

PString readoutGPS(uint16_t memSize = 200, bool serialPrint = false, bool sdPrint = true, bool xbeePrint = true) {
  if (Serial3.available()) {
    char buffer[memSize];
    PString dataGPS(buffer, sizeof(buffer));
    dataGPS << "$$" << DELIMITER << getTimestamp() << DELIMITER << GPS.hour << DELIMITER << GPS.minute << DELIMITER << GPS.seconds << DELIMITER
            << GPS.milliseconds << DELIMITER << GPS.day << DELIMITER << GPS.month << DELIMITER
            << GPS.year << DELIMITER << (uint8_t)GPS.fix << DELIMITER << (uint8_t)GPS.fixquality << DELIMITER
            << GPS.latitude << DELIMITER << (int32_t)GPS.lat << DELIMITER << GPS.longitude << DELIMITER
            << (int32_t)GPS.lon << DELIMITER << GPS.speed << DELIMITER << GPS.angle << DELIMITER
            << GPS.altitude << DELIMITER << GPS.satellites << endl;

    if (serialPrint == true) {
      Serial << dataGPS;
    }

    if (sdPrint == true) {
      logfile << dataGPS;
    }

    if (xbeePrint == true) {
      Serial1 << dataGPS;
    }

    return dataGPS;
  }
}

// Adafruit BNO055 Functions
void initBNO() {
  if (!bno.begin()) {
    return;
  }

  bno.setExtCrystalUse(true);
  timerBNO.setTimeOutTime(BNO055_INTR);
}

PString readoutBNO(uint16_t memSize = 210, bool serialPrint = false, bool sdPrint = true, bool xbeePrint = true) {
  char buffer[memSize];
  PString dataBNO(buffer, sizeof(buffer));

  imu::Quaternion quat = bno.getQuat();
  dataBNO << "%%" << DELIMITER << getTimestamp() << DELIMITER << quat.w() << DELIMITER << quat.x()
          << DELIMITER << quat.y() << DELIMITER << quat.z() << DELIMITER;

  imu::Vector<3> mag = bno.getVector(Adafruit_BNO055::VECTOR_MAGNETOMETER);
  dataBNO << mag.x() << DELIMITER << mag.y() << DELIMITER << mag.z() << DELIMITER;

  imu::Vector<3> gyro = bno.getVector(Adafruit_BNO055::VECTOR_GYROSCOPE);
  dataBNO << gyro.x() << DELIMITER << gyro.y() << DELIMITER << gyro.z() << DELIMITER;

  imu::Vector<3> accel = bno.getVector(Adafruit_BNO055::VECTOR_ACCELEROMETER);
  dataBNO << accel.x() << DELIMITER << accel.y() << DELIMITER << accel.z() << endl;

  if (serialPrint == true) {
    Serial << dataBNO;
  }

  if (sdPrint == true) {
    logfile << dataBNO;
  }

  if (xbeePrint == true) {
    Serial1 << dataBNO;
  }

  return dataBNO;
}

//Sparkfun BME280 Functions
void initBME() {
  if (!atmoSense.beginI2C()) {
    return;
  }
  atmoSense.settings.I2CAddress = BME280_ADDR;
  atmoSense.settings.runMode = BME280_MODE; //Normal mode
  atmoSense.settings.tStandby = BME280_STBY;
  atmoSense.settings.filter = BME280_FITR;
  atmoSense.settings.tempOverSample = BME280_TMPO;
  atmoSense.settings.pressOverSample = BME280_PRSO;
  atmoSense.settings.humidOverSample = BME280_HMDO;

  delay(10);
  atmoSense.begin();
  timerBME.setTimeOutTime(BME280_INTR);
}

PString readoutBME(uint16_t memSize = 100, bool serialPrint = false, bool sdPrint = true, bool xbeePrint = true) {
  char buffer[memSize];
  PString dataBME(buffer, sizeof(buffer));

  dataBME << "!!" << DELIMITER << getTimestamp() << DELIMITER
          << atmoSense.readTempC() << DELIMITER
          << atmoSense.readFloatPressure() << DELIMITER
          << atmoSense.readFloatAltitudeMeters() << DELIMITER
          << atmoSense.readFloatHumidity() << endl;

  if (serialPrint == true) {
    Serial << dataBME;
  }

  if (sdPrint == true) {
    logfile << dataBME;
  }

  if (xbeePrint == true) {
    Serial1 << dataBME;
  }

  return dataBME;
}

//Sparkfun CCS811 Functions
void initCCS() {
  CCS811Core::status returnCode = airqSense.begin();
  if (!returnCode == CCS811Core::SENSOR_SUCCESS) {
    return;
  }
  timerCCS.setTimeOutTime(CCS811_INTR);
}

PString readoutCCS(uint16_t memSize = 100, bool serialPrint = false, bool sdPrint = true, bool xbeePrint = true) {
  if (airqSense.dataAvailable()) {
    char buffer[memSize];
    PString dataCCS(buffer, sizeof(buffer));

    airqSense.readAlgorithmResults();
    airqSense.setEnvironmentalData(atmoSense.readFloatHumidity(), atmoSense.readTempC());

    dataCCS << "@@" << DELIMITER << getTimestamp()  << DELIMITER << airqSense.getCO2() << DELIMITER << airqSense.getTVOC() << endl;

    if (serialPrint == true) {
      Serial << dataCCS;
    }

    if (sdPrint == true) {
      logfile << dataCCS;
    }

    if (xbeePrint == true) {
      Serial1 << dataCCS;
    }

    return dataCCS;
  }
}

void initPayload() {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(100);
    digitalWrite(BUZZER_PIN, LOW);
    delay(100);
    digitalWrite(BUZZER_PIN, HIGH);
    delay(100);
    digitalWrite(BUZZER_PIN, LOW);
    delay(500);
    Serial.println("Telemetry Requesting Payload Powerup");
}

PString readoutpayload(uint16_t memSize = 500, bool serialPrint = false, bool sdPrint = true, bool xbeePrint = true) {
  char buffer[memSize];
  PString dataPayload(buffer, sizeof(buffer));

  Serial.println("Requested");
  timeoutPAYLOAD.reset();
  while (!Serial.available() && !timeoutPAYLOAD.hasTimedOut()) {}
  if (!timeoutPAYLOAD.hasTimedOut()){
    Serial.println("Received");
    dataPayload << "??" << DELIMITER << Serial.readStringUntil('\r') << endl;
  } else{
    Serial.println("Timedout");
  }

  if (serialPrint == true) {
    Serial << dataPayload;
  }

  if (sdPrint == true) {
    logfile << dataPayload;
  }

  if (xbeePrint == true) {
    Serial1 << dataPayload;
  }

  return dataPayload;
}

void runSensors() {
  //Payload Readout
  if (timerPAYLOAD.hasTimedOut()) {
    readoutpayload();
    timerPAYLOAD.reset();
  }

  if (timerGPS.hasTimedOut()) {
    readoutGPS();
    timerGPS.reset();
  }

  if (timerBNO.hasTimedOut()) {
    readoutBNO();
    timerBNO.reset();
  }

  if (timerBME.hasTimedOut()) {
    readoutBME();
    timerBME.reset();
  }

  if (timerCCS.hasTimedOut()) {
    readoutCCS();
    timerCCS.reset();
  }

  if (timerPHOTODIODE.hasTimedOut()) {
    photoreadout = analogRead(PHOTODIODE_PIN);
    Serial1 << "&&" << DELIMITER << getTimestamp() << DELIMITER << photoreadout << endl;
    logfile << "&&" << DELIMITER << getTimestamp() << DELIMITER << photoreadout << endl;
    timerPHOTODIODE.reset();
  }
}

void runWait() {
  if (!GPS_SKIP && !GPS.fix){
    Serial1 << "# GPS Finding Fix" << endl;
    digitalWrite(BUZZER_PIN, HIGH);
    delay(3000);
    digitalWrite(BUZZER_PIN, LOW);

    while (!GPS.fix) {
      prepareParseGPS();
      if (Serial1.available()) {
        c = Serial1.read();
        if ( c == '~' ) {
          GPS_SKIP = true;
          Serial1 << "# GPS fix skipped" << endl;
          break;
        }
      }
    }
  }
  if (Serial3.available()){
    Serial1 << "# GPS fix located" << endl;
  }  

  while (true) {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(50);
    digitalWrite(BUZZER_PIN, LOW);
    delay(500);

    if (Serial1.available()) {
      c = Serial1.read();
      if ( c == '+' ) {
          break;
      }
    }
  }
}

State nextState(State state) {
  State nextstate = state;
  if (Serial1.available()) {
    c = Serial1.read();
  } else {
    c = '*';
  }

  //Serial1.println(c);
  
  if (Serial.available()) {
    d = Serial.read();
  } else {
    d = d;
  }

  switch (state){
    case WAIT:
      switch (c){
        case '+':
          //Serial.println(c);
          nextstate = ARM;
          break;
        case '-':
          GPS_SKIP = false;
          nextstate = WAIT;
          break;
        default:
          nextstate = WAIT;
          break;
      }
    case ARM:
      nextstate = READY;
      break;
    case READY:
      if (c == '-'){
        GPS_SKIP = false;
        nextstate = WAIT;
        break;
      }
      else if (d == 's'){
        Serial1.println("# STARTUP RECEIVED");
        nextstate = RUN;
        break;
      }
      else if (timeoutINIT.hasTimedOut()){
        nextstate = ARM;
        break;
      }
      else {
        nextstate = READY;
        break;
      }
    case RUN:
      if (c == '-'){
        GPS_SKIP = false;
        nextstate = WAIT;
        break;      
      } else {
        nextstate = RUN;
        break;
      }
  }
  return nextstate;
}

void setup() {
  initAll();
}

void loop() {
  switch (state){
    case WAIT:
      runWait();
      //Serial.println("WAIT");
      break;
    case ARM:
      initPayload();
      timeoutINIT.reset();
      //Serial.println("ARM");
      break;
    case READY:
      //Serial.println("READY");
      break;
    case RUN:
      //Serial.println("RUN");
      runSensors();
      break;
  }
  state = nextState(state);
  //state = WAIT;
 }