import os
import time
import threading
import subprocess
import ctypes
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Isolation settings
ISOLATION_DURATION = 120
is_isolated = False
last_isolation_time = 0
COOLDOWN_PERIOD = 180
lock = threading.Lock()

def is_admin():
    """Checks for Administrative privileges"""
    try:
        return ctypes.windll.shell32.IsUserAnAdmin() != 0
    except:
        return False

def get_wifi_interface_name():
    """Discover WiFi adapter name using PowerShell (Reliable)"""
    try:
        # Use PowerShell to get the name of the WiFi adapter directly
        cmd = 'powershell "Get-NetAdapter | Where-Object { $_.InterfaceDescription -match \\"802.11\\" -or $_.Name -match \\"Wi-Fi\\" } | Select-Object -ExpandProperty Name"'
        output = subprocess.check_output(cmd, encoding='utf-8', shell=True).strip()
        if output:
            # Handles multi-line/multiple adapters by picking the first one
            return output.splitlines()[0].strip()
    except Exception as e:
        print(f"[Agent] PowerShell Discovery failed: {e}")
    return "Wi-Fi" # Default fallback

def wifi_control(status):
    """Enable or disable WiFi using PowerShell (Requires Admin)"""
    interface = get_wifi_interface_name()
    state_cmd = "Disable-NetAdapter" if status == "OFF" else "Enable-NetAdapter"
    
    print(f"[Agent] Running {state_cmd} on interface: '{interface}'")
    
    try:
        # Use PowerShell as it's more robust than netsh for modern drivers
        pwsh_cmd = f'powershell "{state_cmd} -Name \\"{interface}\\" -Confirm:$false"'
        result = subprocess.run(
            pwsh_cmd,
            capture_output=True,
            text=True,
            shell=True
        )
        
        if result.returncode != 0:
            print(f"[Agent] !!! POWERSHELL COMMAND FAILED (Code {result.returncode}) !!!")
            stderr = result.stderr.strip()
            print(f"[Agent] System Error: {stderr}")
            
            if not is_admin():
                print(f"[Agent] HELP: ACCESS DENIED. You MUST run the terminal as Administrator.")
            return False
            
        print(f"[Agent] Success: WiFi successfully set to {status}")
        return True
    except Exception as e:
        print(f"[Agent] Exception: {e}")
        return False

def run_isolation_cycle():
    global is_isolated, last_isolation_time
    
    print("[Agent] Initiating critical isolation cycle...")
    if wifi_control("OFF"):
        is_isolated = True
        print(f"[Agent] ISOLATION ACTIVE. Network is now disabled for {ISOLATION_DURATION}s.")
        time.sleep(ISOLATION_DURATION)
        
        print("[Agent] Restoration triggered...")
        wifi_control("ON")
        
        with lock:
            is_isolated = False
            last_isolation_time = time.time()
        print("[Agent] Full protection cycle completed successfully.")
    else:
        with lock:
            is_isolated = False
        print("[Agent] Isolation aborted. Agent remained standby.")

@app.route('/isolate', methods=['POST'])
def isolate():
    global is_isolated, last_isolation_time
    current_time = time.time()
    
    with lock:
        if is_isolated:
            return jsonify({"status": "error", "message": "Isolation in progress"}), 400
        
        if (current_time - last_isolation_time) < COOLDOWN_PERIOD:
            remaining = int(COOLDOWN_PERIOD - (current_time - last_isolation_time))
            return jsonify({"status": "error", "message": f"Cooldown active. Wait {remaining}s"}), 429

        is_isolated = True
        threading.Thread(target=run_isolation_cycle, daemon=True).start()
        
    return jsonify({"status": "success", "message": "System isolated"})

@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({
        "is_isolated": is_isolated,
        "cooldown": max(0, int(COOLDOWN_PERIOD - (time.time() - last_isolation_time))) if not is_isolated else 0,
        "interface": get_wifi_interface_name(),
        "is_admin": is_admin()
    })

if __name__ == '__main__':
    print("="*60)
    print("             PHISHGUARD PROTECTION AGENT             ")
    print("="*60)
    print(f" Detected Adapter : {get_wifi_interface_name()}")
    print(f" Admin Privileges : {'YES' if is_admin() else 'NO (FAILED - RUN AS ADMIN)'}")
    print("="*60)
    app.run(port=5001, debug=False)
