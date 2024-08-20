module.exports = function (RED) {
    const Toypad = require('toypad-lib');

    function ToypadColorNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const toypad = new Toypad();

        // Initialize Toypad
        toypad.init();

        // Handle input to set the color
        node.on('input', function (msg) {
            
            const padNum = config.pad || msg.pad || 0;
            const color = msg.color || [0, 0, 255]; // Default color is blue
            const fade = config.fade || msg.fade || false;

            if (fade) {
                const fadeDuration = config.fadeDuration || msg.fadeDuration || 20;
                toypad.setPadColorFade(padNum, color, fadeDuration);
            } else {
                toypad.setPadColor(padNum, color);
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
