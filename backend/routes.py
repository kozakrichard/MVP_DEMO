from flask import send_file, send_from_directory, safe_join, abort, Flask
from flask import request
from midiutil import MIDIFile
import json
import errno
import os

app = Flask(__name__)
app.config["CLIENT_MIDI"] = "/Users/nigel/Documents/GitHub/test/backend/"

track = 0
channel = 0
time = 0   # In beats
duration = 1   # In beats
tempo = 60  # In BPM
volume = 100  # 0-127, as per the MIDI standard


notes = {"C0": 24, "C#0": 25, "D0": 26, "D#0": 27, "E0": 28, "F0": 29, "F#0": 30, "G0": 31, "G#0": 32, "A0": 33, "A#0": 34, "B0": 35,
         "C1": 36, "C#1": 37, "D1": 38, "D#1": 39, "E1": 40, "F1": 41, "F#1": 42, "G1": 43, "G#1": 44, "A1": 45, "A#1": 46, "B1": 47,
         "C2": 48, "C#2": 49, "D2": 50, "D#2": 51, "E2": 52, "F2": 53, "F#2": 54, "G2": 55, "G#2": 56, "A2": 57, "A#2": 58, "B2": 59,
         "C3": 60, "C#3": 61, "D3": 62, "D#3": 63, "E3": 64, "F3": 65, "F#3": 66, "G3": 67, "G#3": 68, "A3": 69, "A#3": 70, "B3": 71,
         "C4": 72, "C#4": 72, "D4": 73, "D#4": 74, "E4": 75, "F4": 76, "F#4": 77, "G4": 78, "G#4": 79, "A4": 80, "A#4": 81, "B4": 82,
         "C5": 83, "C#5": 84, "D5": 85, "D#5": 86, "E5": 87, "F5": 88, "F#5": 89, "G5": 90, "G#5": 91, "A5": 92, "A#5": 93, "B5": 94,
         "C6": 95, "C#6": 96, "D6": 97, "D#6": 98, "E6": 99, "F6": 100, "F#6": 101, "G6": 102, "G#6": 103, "A6": 104, "A#6": 105, "B6": 106,
         "C7": 107, "C#7": 108, "D7": 109, "D#7": 110, "E7": 111, "F7": 112, "F#7": 113, "G7": 114, "G#7": 115, "A7": 116, "A#7": 117, "B7": 118,
         "C8": 119, "C#8": 120, "D8": 121, "D#8": 122, "E8": 123, "F8": 124, "F#8": 125, "G8": 126, "G#8": 127}


@app.route('/api/process_data', methods=['POST', 'GET'])
def send_sample():
    midiData = request.get_json()
    # To Do
    # Data should be validated before processed
    # The Midi File Creation should be in a separate function
    # Try/Catch Errors
    MyMIDI = MIDIFile(1)
    MyMIDI.addTempo(track, time, tempo)

    if isinstance(midiData, list):
        for i in range(0, len(midiData)):
            if midiData[i]:
                for pitch in midiData[i]:
                    print(track, channel, notes[pitch], i, duration, volume)
                    MyMIDI.addNote(
                        track, channel, notes[pitch], i, duration, volume)

        with open("test.mid", "wb") as output_file:
            MyMIDI.writeFile(output_file)

        output_file.close()
        output_file.save('/Users/nigel/Documents/GitHub/test/backend/test.mid')

    else:
        console.log("Malformed Object")

    # return send_from_directory(app.config["CLIENT_MIDI"], filename = 'test.txt', as_attachment=True)
    # serve_static("abc")

    # p = "test.txt";
    # return send_file(p, as_attachment=True)
    return "{Processed: true}"


@app.route('/download')
def serve_static(filename):
    # print("sdfasdfdjansfjnsf")
    return send_file("/Users/nigel/Documents/GitHub/test/backend/test.txt")


if __name__ == "__main__":
    app.run(debug=True)
