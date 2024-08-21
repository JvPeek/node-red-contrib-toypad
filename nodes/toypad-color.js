module.exports = function (RED) {
    const Toypad = require('toypad-lib');
    function isArrayWithThreeNumbers(obj) {
        return Array.isArray(obj) && 
               obj.length === 3 && 
               obj.every(item => typeof item === 'number');
      }
      
    function ToypadColorNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const toypad = new Toypad();

        // Initialize Toypad
        toypad.init();

        // Handle input to set the color
        node.on('input', function (msg) {
            if (!isArrayWithThreeNumbers(msg.color)) {
                node.status({fill:"red",shape:"dot",text:"malformed color information"});
                return null;
            }
            const padNum = config.pad || msg.pad || 0;
            const color = msg.color || [0, 0, 0]; // Default color is off
            
            const fade = config.fade || msg.fade || false;

            if (fade) {
                const fadeDuration = config.fadeDuration || msg.fadeDuration || 20;
                toypad.setPadColorFade(padNum, color, fadeDuration);
                node.status({fill:"green",shape:"dot",text:"set fade"});

            } else {
                toypad.setPadColor(padNum, color);
                node.status({fill:"green",shape:"dot",text:"set color"});
            }

            node.send(msg);
        });

        // Clean up on close
        node.on('close', function () {
            toypad.close();
        });
    }

    RED.nodes.registerType('toypad-color', ToypadColorNode);
};
