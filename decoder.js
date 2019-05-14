/* 
 * Decoder function for The Things Network to unpack the payload of Bosch Parking Lot Sensors
 *
 * More info on the sensors/buy online:
 * https://connectedthings.store/lorawan-sensors/bosch-parking-lot-sensors.html
 *
 * This function was created by Al Bennett at Sensational Systems - al@sensational.systems
 */

function Decoder(bytes, port) {

  var decoded = {
    "bytes": bytes,
    "port": port,
    "packet_type": "Unknown"
  };

  // Startup packets are on port 3
  if(3 === port) {
    
    decoded.packet_type = "Startup";
    
    // Bytes 0 - 11 are debug info
    decoded.debug = bytes.slice(0, 12);
    
    // Bytes 12 - 12 are firmware version, convert to string
    decoded.firmware_version = bytes[12] + '.' + bytes[13] + '.' + bytes[14];
    
    // Byte 15 is the reset reason, conver to string
    decoded.reset_reason = 0;
    
    switch (bytes[15]) {
      case 1: decoded.reset_reason = "Watchdog";
              break;
      case 2: decoded.reset_reason = "Power On";
              break;
      case 3: decoded.reset_reason = "System Request";
             break;
      case 4: decoded.reset_reason = "Other";
              break;
      default: decoded.reset_reason = "Unknown";
    } 
    
    // Final byte, 16, is seven reserved bits with the LSB being the current occupancy state
    decoded.occupied = false;
    if(1 === (bytes[16] & 1)) {
      decoded.occupied = true;
    }
  }

  // Parking status packets are on port 1
  // Heartbeat packets are on port 2, but the same as status packets, so handled the same
  if(1 === port || 2 === port) {
    
    if(1 === port) {
      decoded.packet_type = "Status";
    } else {
      decoded.packet_type = "Heartbeat";
    }

    decoded.occupied = (1 === bytes[0]) ? true : false;
    
  }


  return decoded;

}
