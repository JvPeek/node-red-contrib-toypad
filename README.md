# node-red-contrib-toypad
this is a collection of nodes to control the Lego Dimensions Toypad NFC reader via Node-RED.

## Currently supported
✅ Reading NFC UIDs

✅ Detecting the different reader regions for the tags

✅ Controlling the RGB LED color for every section

✅ Fading LEDs

✅ Flashing LEDs

❌ Reading payloads

❌ Writing payloads

## Installation
### Linux
libusb needs to be installed.
You also might want to create a udev rule.
```
sudo vim /etc/udev/rules.d/99-dimensions.rules
```

```bash
SUBSYSTEM=="usb", ATTR{idVendor}=="0e6f", ATTR{idProduct}=="0241", MODE="0666"
```
#### Node-RED inside Docker
This needs some attention as you can't access USB right away.
I've found success in adding the following lines to my docker-compose.yaml:
```yaml
    devices:
      - '/dev/bus:/dev/bus'
```
