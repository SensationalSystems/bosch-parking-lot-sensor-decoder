# The Things Network decoder function for Bosch Parking Lot Sensors
Bosch Connected Devices and Solutions make a LoRaWAN Parking Lot Sensor that detects the presence of a car in a parking space. This device enables interesting applications for car parks, like tracking usage, displaying the exact number of available spaces to reduce time searching for a free space.

We sell the sensors online, here:
 * https://connectedthings.store/lorawan-sensors/bosch-parking-lot-sensors.html

To use this:
* create a TTN application and register your devices using the TTN console
* in your application, choose "Payload Formats" from the navigation
* paste the decoder function into the textarea

The unit sends a few different payloads that are well documented. A startup packet is sent when the unit is first installed, or reboots. Status updates are sent every time a car is parked or driven away from a space. The decoder function handles all of these.

This code is MIT licenced, and it works fine in our testing. We don't claim it to be excellent, pull requests are encouraged!

