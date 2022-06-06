enum RadioMessage {
    message1 = 49434,
    increase_db = 24409,
    decrease_db = 42436
}
radio.onReceivedNumber(function (receivedNumber) {
    if (serial_numbers.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber)) >= 0) {
        if (radio.receivedPacket(RadioPacketProperty.SignalStrength) <= dB_threshold) {
            recent_time[serial_numbers.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber))] = radio.receivedPacket(RadioPacketProperty.Time)
        } else {
            if (radio.receivedPacket(RadioPacketProperty.Time) - recent_time[serial_numbers.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber))] >= 5000) {
                soundExpression.spring.playUntilDone()
                recent_time[serial_numbers.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber))] = radio.receivedPacket(RadioPacketProperty.Time)
            }
        }
    } else {
        serial_numbers.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
        recent_time[serial_numbers.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber))] = radio.receivedPacket(RadioPacketProperty.Time)
    }
})
radio.onReceivedMessage(RadioMessage.increase_db, function () {
    dB_threshold += 5
})
function setup () {
    radio.setGroup(team)
    basic.showNumber(team)
    serial_numbers = []
    recent_time = []
    dB_threshold = -75
}
radio.onReceivedMessage(RadioMessage.decrease_db, function () {
    dB_threshold += -5
})
let recent_time: number[] = []
let dB_threshold = 0
let serial_numbers: number[] = []
let team = 0
team = 0
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(7)
basic.forever(function () {
    radio.sendNumber(0)
    basic.pause(500)
})
