// Monitor
var EngineForce : float = 0; // Speedometer
var Gear = 'N';
var Cam : Camera;
private var speed = 0;

// Exhaust
var Fume1 : ParticleEmitter;
var Fume2 : ParticleEmitter;

// Vehicle stats
var VehicleName = 'Ford F-150 \'67';
var wheel1 : WheelCollider;
var wheel2 : WheelCollider;
var wheel3 : WheelCollider;
var wheel4 : WheelCollider;
var wheelleft : Transform;
var wheelright : Transform;
var maxPower : float = 4.2; // Maximum speed
var steer:int;
var maxSteer=25; // Turn angle (deg)
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

var Ignition : AudioClip;
var EngineIdle : AudioClip;
var EngineLo : AudioClip;
var LightSound : AudioClip; //LightSW

var audio1 : AudioSource;
var audio2 : AudioSource;
var audio3 : AudioSource;

var light1:Light;
var light2:Light;
var light3:Light;
var light4:Light;
var light5:Light;
var light6:Light;
private var lightOn : boolean = false;

private var EngineRunning = true; // Is the engine running?
private var EngineStarter : boolean = true;

//


function Start () {

	rigidbody.centerOfMass = Vector3(0, -0.5, 0);
	audio1.playOnAwake = false;
	audio2.playOnAwake = false;
	audio3.playOnAwake = false;
	
}


function FixedUpdate () {

	
	
	wheelleft.localEulerAngles.y = wheel1.steerAngle;
	wheelright.localEulerAngles.y = wheel2.steerAngle;
	
	//wheelleft.Rotate(0, wheel1.rpm * -6 * Time.deltaTime, 0); //< BULLSHIT
	//wheelright.Rotate(0, wheel2.rpm * -6 * Time.deltaTime, 0);	
		
}


function Update () {
	speed = rigidbody.velocity.sqrMagnitude;
		
	steer=Input.GetAxis("Horizontal") * maxSteer;
	
	wheel1.steerAngle=steer;
	wheel2.steerAngle = wheel1.steerAngle;

    light3.intensity = 0.25;
    light4.intensity = 0.25;
    light5.intensity = 0;
    light6.intensity = 0;
	
	if ((Fuel > 0) && (EngineRunning == true)) {
		Fume1.maxSize = 2;
		Fume2.maxSize = 1.5;
		monitor = '';
		Fuel -= 0.001 * Time.deltaTime * (0.001 * BHP * FuelConsumption); // Engine on idle fuel consumption
		if ((audio2.isPlaying==false) && (speed > 1)) {
			audio2.loop = true;
			audio2.volume = 0.4;
			audio2.PlayOneShot(EngineLo);
			/*if (speed >= 80) {
				audio2.pitch = 0.8;
			}
			else {*/
				//audio2.pitch = (Random.Range(0.01, 0.0111)) * speed;
			
		}
		if (audio1.isPlaying == false) {
		audio1.loop = true;
		audio1.clip = EngineIdle;
		audio1.Play(44100);
		audio1.volume = 0.3;
		}
	}
	
	if (Input.GetKeyDown (KeyCode.E)) {
		EngineStarter = !EngineStarter;
		EngineRunning = EngineStarter;
		if (EngineRunning == true) {
			audio3.loop = false;
			audio3.PlayOneShot(Ignition);
		}
	}

	if (Input.GetKeyDown (KeyCode.T)) {
		Fuel += 1;
	}
	
	
	
	if ((Input.GetKey(KeyCode.W)) && (Fuel > 0) && (EngineRunning == true)) {
		
		Fuel -= 0.001 * Time.deltaTime * (0.01 * BHP * FuelConsumption);
		burn = 'BURNIN DEM OILZ!!!';
				
		EngineForce += BHP * Time.deltaTime;
		wheel3.motorTorque = EngineForce;
		wheel4.motorTorque = EngineForce;
			if (speed <= 0.35 * maxPower) {
				Gear = '1';
				Fume1.minEmission = 10;
				Fume1.maxEmission = 30;
				Fume2.minEmission = 10;
				Fume2.maxEmission = 30;
				audio2.pitch = 0.03 * speed;
				EngineForce -= Gear1 * Time.deltaTime;
			}
			
			if (speed > 0.4 * maxPower) {
				Gear = '2';
				Fume1.minEmission = 30;
				Fume1.maxEmission = 60;
				Fume2.minEmission = 30;
				Fume2.maxEmission = 60;
				audio2.pitch = 0.02 * speed;
				EngineForce -= Gear2 * Time.deltaTime;
			}
			
			if (speed > 0.6 * maxPower) {
				Gear = '3';
				audio2.pitch = 0.01 * speed;
				EngineForce -= Gear3 * Time.deltaTime;
			}
			
			if (speed > 0.95 * maxPower) {
				Gear = '4';
				Fume1.minEmission = 10;
				Fume1.maxEmission = 20;
				Fume2.minEmission = 10;
				Fume2.maxEmission = 20;
				audio2.pitch = 0.008 * speed;
				EngineForce -= Gear4 * Time.deltaTime;
			}
			
			if (EngineForce > maxPower) {
				EngineForce = maxPower;
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
		
		if (speed <= 0) {
			Gear = 'R';
			light3.intensity = 1;
			light4.intensity = 1;
			EngineForce -= BHP * Time.deltaTime;
			wheel3.motorTorque = EngineForce;
			wheel4.motorTorque = EngineForce;
			
			Fume1.minEmission = 10;
			Fume1.maxEmission = 30;
			Fume2.minEmission = 10;
			Fume2.maxEmission = 30;
			
			/*if (speed < (0.45 * maxPower)) {
				EngineForce -= (0.3 * maxPower);
			}*/
		}
		else {
			wheel3.brakeTorque += Braking * Time.deltaTime;
			wheel4.brakeTorque += Braking * Time.deltaTime;
		}
	}
	
	if ((Input.GetKey(KeyCode.S)) && (Fuel > 0) && (EngineRunning == true) && (EngineForce < -1)) {
		light5.intensity = 1;
		light6.intensity = 1;
	}
	
	if (speed > 0) {
		EngineForce -= Deceleration * Time.deltaTime;
	}
	if (speed < 0) {
		EngineForce += Deceleration * Time.deltaTime;
	}
	
	if ((speed < 1) && (speed > -1) ) {
		Fume1.minEmission = 1;
		Fume1.maxEmission = 3;
		Fume2.minEmission = 1;
		Fume2.maxEmission = 3;
		audio2.Stop();
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
		if (audio1.isPlaying == true) {
			audio1.Stop();
		}
		if (audio2.isPlaying == true) {
			audio2.Stop();
		}
	}
	
	wheel3.motorTorque = EngineForce; //Redirecting engine power to RWD
	wheel4.motorTorque = EngineForce; //Redirecting engine power to RWD
	
	if (Input.GetKeyDown ("l")) {
		lightOn = !lightOn;
		light1.enabled = lightOn;
		light2.enabled = lightOn;
		light3.enabled = lightOn;
		light4.enabled = lightOn;
		audio3.clip = LightSound;
		audio3.Play();
    }
    	
}

function OnGUI () {

	GUI.Label (Rect (10, 10, 100, 30), VehicleName);
	GUI.Label (Rect (10, 30, 150, 30), "Engine Force: " + EngineForce);
	GUI.Label (Rect (10, 50, 100, 30), "Gear: " + Gear);
	GUI.Label (Rect (10, 70, 300, 30), "Fuel (l): " + Fuel);
	GUI.Label (Rect (10, 90, 300, 30), burn);
	GUI.Label (Rect (10, 110, 300, 30), "Engine Running:" + EngineRunning);
	GUI.Label (Rect (10, 150, 100, 30), "WSAD - Controls");
	GUI.Label (Rect (10, 170, 200, 30), "Spacebar - Day/Night cycle");
	GUI.Label (Rect (10, 190, 100, 30), "L - Headlights");
	GUI.Label (Rect (10, 210, 100, 30), "Cmd+Q - Quit");
	GUI.Label (Rect (10, 250, 600, 30), monitor);
	GUI.Label (Rect (10, 270, 600, 30), speed + ' km/h HOW');
	GUI.Label (Rect (10, 290, 600, 30), wheel1.rpm + ' wheel1 rpm');
	GUI.Label (Rect (10, 310, 600, 30), wheel3.rpm + ' wheel3 rpm');
}