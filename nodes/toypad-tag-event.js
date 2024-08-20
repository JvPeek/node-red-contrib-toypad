const Toypad = require('toypad-lib');

module.exports = function (RED) {
    function ToypadTagEventNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const toypad = new Toypad();

        // Initialize Toypad
        toypad.init();
        
        // Register a callback for tag events
        toypad.onTagEvent(({ padNum, uid, action, bytelist}) => {

            // Create a message object
            const msg = {
                payload: {
                    pad: padNum,
                    uid: uid,
                    action: action,
                    bytelist: bytelist
                }
            };
            // Send the message to the output
            if (action == "added") {
                node.status({fill:"green",shape:"dot",text:"Tag detected"});

                node.send([msg,null]);
            } else {
                node.status({fill:"grey",shape:"dot",text:"Tag removed"});

                node.send([null,msg]);
            }
        });

        // Clean up on close
        node.on('close', function () {
            toypad.close();
        });
        
        toypad.listenForTags();
    }


    RED.nodes.registerType('toypad-tag-event', ToypadTagEventNode);
};
