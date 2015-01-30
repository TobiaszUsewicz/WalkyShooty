// Monitor
var CurrentSpeed : float = 0; // Speedometer
var Gear = 'N';
var Cam : Camera;

// Exhaust
var Fume1 : ParticleEmitter;
var Fume2 : ParticleEmitter;

// Vehicle stats
var VehicleName = 'Ford F-150 \'67';
var Vmax : float = 4.2; // Maximum speed
var TurnAngle = 25; // (deg) Turning angle
var TurnSpeed = 10; // How long it takes to full turning angle
var BHP = 120; // How fast the vehicle accelerates (horsepower)
var Deceleration = 5; // How fast the vehicle loses speed when not accelerating
var Braking = 30; // Brake force
var Gear1 : float = 0.1; // Engine resistance for this gear
var Gear2 : float = 0.25; // Engine resistance for this gear
var Gear3 : float = 0.35; // Engine resistance for this gear
var Gear4 : float = 0.5; // Engine resistance for this gear

var MaxFuel = 60; // (l) Fuel tank size
var FuelConsumption = 10; // Fuel consumption speed
var Fuel : float = 1;
private var burn = "BURN DA OILZ!!!";
private var monitor = "monitor";

var MaxCargo = 10; // Maximum amount of items in the trunk
var MaxCargoWeight = 800; // (kg) Maximum total cargo weight

var EngineSound = "engine_V8pickup"; // Engine sound

private var EngineRunning = true; // Is the engine running?
private var EngineStarter : boolean = true;



function Update () {
	if ((Fuel > 0) && (EngineRunning == true)) {
		Fume1.maxSize = 0.7;
		Fume2.maxSize = 0.6;
		monitor = '';
		Fuel -= 0.001 * Time.deltaTime * (0.001 * BHP * FuelConsumption); // Engine on idle fuel consumption
	}
	
	if (Input.GetKeyDown (KeyCode.E)) {
		EngineStarter = !EngineStarter;
		EngineRunning = EngineStarter;
	}

	if (Input.GetKeyDown (KeyCode.T)) {
		Fuel += 1;
	}
	
	if ((Input.GetKey(KeyCode.W)) && (Fuel > 0) && (EngineRunning == true)) {
		
		Fuel -= 0.001 * Time.deltaTime * (0.01 * BHP * FuelConsumption);
		burn = 'BURNIN DEM OILZ!!!';
				
		CurrentSpeed += (BHP * 0.015) * Time.deltaTime;
			if (CurrentSpeed <= 0.1 * Vmax) {
				Gear = '1';
				Fume1.minEmission = 10;
				Fume1.maxEmission = 30;
				Fume2.minEmission = 10;
				Fume2.maxEmission = 30;
				CurrentSpeed -= Gear1 * Time.deltaTime;
			}
			
			if (CurrentSpeed > 0.3 * Vmax) {
				Gear = '2';
				Fume1.minEmission = 30;
				Fume1.maxEmission = 60;
				Fume2.minEmission = 30;
				Fume2.maxEmission = 60;
				CurrentSpeed -= Gear2 * Time.deltaTime;
			}
			
			if (CurrentSpeed > 0.5 * Vmax) {
				Gear = '3';
				CurrentSpeed -= Gear3 * Time.deltaTime;
			}
			
			if (CurrentSpeed > 0.8 * Vmax) {
				Gear = '4';
				Fume1.minEmission = 10;
				Fume1.maxEmission = 20;
				Fume2.minEmission = 10;
				Fume2.maxEmission = 20;
				CurrentSpeed -= Gear4 * Time.deltaTime;
			}
			
			if (CurrentSpeed > Vmax) {
				CurrentSpeed = Vmax;
			}
	}
	else {
		Fume1.minEmission = 1;
		Fume1.maxEmission = 5;
		Fume2.minEmission = 1;
		Fume2.maxEmission = 5;
		burn = "IDLEFAG";
	}	
	
	if ((Input.GetKey(KeyCode.S)) && (Fuel > 0) && (EngineRunning == true)) {
	
		Fuel -= 0.001 * Time.deltaTime * (0.01 * BHP * FuelConsumption);
		burn = 'BURNIN DEM OILZ!!!';
		
		if (CurrentSpeed < 0) {
		Gear = 'R';
		CurrentSpeed -= (BHP * 0.01) * Time.deltaTime;
		
			Fume1.minEmission = 10;
			Fume1.maxEmission = 30;
			Fume2.minEmission = 10;
			Fume2.maxEmission = 30;
			
			if (CurrentSpeed < -(0.25 * Vmax)) {
				CurrentSpeed = -(0.25 * Vmax);
			}
		}
		else {
			CurrentSpeed -= Braking * 0.1 * Time.deltaTime;
		}
	}
	if (CurrentSpeed > 0) {
			CurrentSpeed -= Deceleration * 0.1 * Time.deltaTime;
	}
	if (CurrentSpeed < 0) {
			CurrentSpeed += Deceleration * 0.1 * Time.deltaTime;
	}
	
	if (Input.GetKey(KeyCode.A)) {
		if (CurrentSpeed > 0.1) {
			transform.Rotate(0, -Time.deltaTime * TurnSpeed + (0.05 * CurrentSpeed), 0);
		}
		if (CurrentSpeed <- 0.1) {
			transform.Rotate(0, Time.deltaTime * TurnSpeed - (0.05 * CurrentSpeed), 0);
		}
	}
	
	if (Input.GetKey(KeyCode.D)) {
		if (CurrentSpeed > 0.1) {
			transform.Rotate(0, Time.deltaTime * TurnSpeed - (0.05 * CurrentSpeed), 0);
		}
		if (CurrentSpeed <- 0.1) {
			transform.Rotate(0, -Time.deltaTime * TurnSpeed + (0.05 * CurrentSpeed), 0);
		}
	}
	
	if ((CurrentSpeed < 0.018) && (CurrentSpeed > -0.018) ) {
		Fume1.minEmission = 1;
		Fume1.maxEmission = 3;
		Fume2.minEmission = 1;
		Fume2.maxEmission = 3;
		CurrentSpeed = 0;
	}
	
	if (Fuel <=0) {
		Fuel = 0;
		EngineRunning = false;
		Fume1.maxSize = 0;
		Fume1.minSize = 0;
		Fume2.maxSize = 0;
		Fume2.minSize = 0;
		monitor = 'OUT OF FUEL';
	}
	
	if (EngineRunning == false) {
		Fume1.maxSize = 0;
		Fume1.minSize = 0;
		Fume2.maxSize = 0;
		Fume2.minSize = 0;
	}
		
	rigidbody.velocity = CurrentSpeed * transform.forward;
	
}

function OnGUI () {
	GUI.Label (Rect (10, 10, 100, 30), VehicleName);
	GUI.Label (Rect (10, 30, 150, 30), "Speed: " + CurrentSpeed);
	GUI.Label (Rect (10, 50, 100, 30), "Gear: " + Gear);
	GUI.Label (Rect (10, 70, 300, 30), "Fuel (l): " + Fuel);
	GUI.Label (Rect (10, 90, 300, 30), burn);
	GUI.Label (Rect (10, 110, 300, 30), "Engine Running:" + EngineRunning);
	GUI.Label (Rect (10, 150, 100, 30), "WSAD - Controls");
	GUI.Label (Rect (10, 170, 200, 30), "Spacebar - Day/Night cycle");
	GUI.Label (Rect (10, 190, 100, 30), "L - Headlights");
	GUI.Label (Rect (10, 210, 100, 30), "Cmd+Q - Quit");
	GUI.Label (Rect (10, 250, 600, 30), monitor);
}