document.addEventListener('DOMContentLoaded', (event) => {
    const client = mqtt.connect('wss://7a3adf123d584eb0b1c891a0cb842c35.s1.eu.hivemq.cloud:8884/mqtt', {
        username: 'isp32',
        password: 'ISPsogem22'
    });

    const directionSelect = document.getElementById('direction');
    const speedRange = document.getElementById('speed');
    const sendControlButton = document.getElementById('sendControl');

    const xAxisElement = document.getElementById('xAxis');
    const yAxisElement = document.getElementById('yAxis');
    const zAxisElement = document.getElementById('zAxis');

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe('sensor22a/x_axis');
        client.subscribe('sensor22a/y_axis');
        client.subscribe('sensor22a/z_axis');
    });

    client.on('message', (topic, message) => {
        console.log('Received message', message.toString(), 'from topic', topic);
        if (topic === 'sensor22a/x_axis') {
            xAxisElement.textContent = message.toString();
        } else if (topic === 'sensor22a/y_axis') {
            yAxisElement.textContent = message.toString();
        } else if (topic === 'sensor22a/z_axis') {
            zAxisElement.textContent = message.toString();
        }
    });

    sendControlButton.addEventListener('click', () => {
        const direction = directionSelect.value;
        const speed = speedRange.value;
        client.publish('motor22a/direction', direction);
        client.publish('motor22a/speed', speed);
        console.log('Direction:', direction, 'Speed:', speed);
    });
});

// Slider logic
let counter = 1;
setInterval(function() {
    const radioElement = document.getElementById('radio' + counter);
    if (radioElement) {
        radioElement.checked = true;
    } else {
        console.error('Element with id radio' + counter + ' not found');
    }
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 5000);
