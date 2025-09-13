from machine import Pin, I2C
from ina219 import INA219
from logging import INFO
import time

class SensorData:
    def __init__(self, voltage, current, power):
        self.voltage = voltage
        self.current = current
        self.power = power

class PowerMonitor:
    def __init__(self, shunt_ohms=0.1, scale=7000, i2c_scl_pin=22, i2c_sda_pin=21, log_level=INFO):
        self.shunt_ohms = shunt_ohms
        self.scale = scale
        self.i2c = I2C(-1, Pin(i2c_scl_pin), Pin(i2c_sda_pin))
        self.ina = INA219(shunt_ohms, self.i2c, log_level=log_level)
        self.ina.configure()

        self.actual = SensorData()
        self.scaled = SensorData()

    def read(self):
        self.actual.voltage = self.ina.voltage()
        self.actual.current = self.ina.current()
        self.actual.power = self.ina.power()

        self.scaled.voltage = self.actual.voltage  # Voltage remains the same
        self.scaled.current = self.actual.current * self.scale  / 1000 # in mA
        self.scaled.power = self.actual.power * self.scale / 1000000  # in kW

        return self
    
    def display(self):
        print("\rActual: {:.2f}V, {:.1f}mA, {:.1f}mW | Simulated: {:.1f}V, {:.2f}A, {:.2f}kW    ".format(
            self.actual.voltage, 
            self.actual.current, 
            self.actual.power,
            self.scaled.voltage,  
            self.scaled.current / 1000,  # Convert to A
            self.scaled.power),   # in kW
            end="")
        return self
    
    def monitor(self, interval=1):
        try:
            while True:
                self.read().display()
                time.sleep(interval)
        except KeyboardInterrupt:
            print("\n\nMonitoring stopped by user")
            return self