import threading
import time
import eel
import os

from logic_brain import friday_brain

eel.init("web")

# --- Update Chat and Typing Animation ---
def update_ui_loop():
    last_input, last_response = "", ""
    while True:
        try:
            input_data = open("input.txt").read().strip() if os.path.exists("input.txt") else ""
            response_data = open("output.txt").read().strip() if os.path.exists("output.txt") else ""

            # Only update if there's new content
            if input_data != last_input or response_data != last_response:
                eel.add_chat_message(input_data, response_data)
                animated_text = f"Input: {input_data}\nResponse: {response_data}"
                eel.animate_text("output-box", animated_text)
                last_input, last_response = input_data, response_data

        except Exception as e:
            print("[UI Update Error]:", e)

        time.sleep(1)

@eel.expose
def start_display_loop():
    threading.Thread(target=update_ui_loop, daemon=True).start()

@eel.expose
def process_voice_input(text):
    # Handle the voice input — e.g., write to input.txt
    with open("input.txt", "w") as f:
        f.write(text)
    print("[Voice Command Received]:", text)

def ui():
    try:
        eel.start("index.html", mode='chrome', port=8080, cmdline_args=['--start-fullscreen'])
    except EnvironmentError:
        eel.start("index.html", mode='default', port=8080)

def friday():
    threading.Thread(target=friday_brain, daemon=True).start()
    ui()

if __name__ == "__main__":
    friday()
