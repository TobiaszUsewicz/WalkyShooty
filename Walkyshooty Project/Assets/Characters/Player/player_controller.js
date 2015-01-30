var speed = 1.5;
var jumpForce = int;
var stamina : float;
private var isWalking : boolean;
private var isSprinting : boolean;
private var isJumping : boolean;
var isMoving : boolean;
var PlayerSpeed = 0;
var Skin : GUISkin;
//

function Update() {

	Rest();
	PlayerSpeed = rigidbody.velocity.sqrMagnitude;
		
	if ((Input.GetKey(KeyCode.LeftShift)) && (stamina > 0)) {
		Sprint();
	}
	else {
		Walk();
	}
	
	if (Input.GetButtonDown ("Jump")) {
		Jump();
	}
	
}

function setStamina(value : float) {
	stamina = value;
	
	if (stamina > 100) {
		stamina = 100;
	}
	if (stamina < 0) {
		stamina = 0;
	}
}

function Rest() {
	
	if (PlayerSpeed <= 0) {
		isMoving = false;
		isWalking = false;
		isSprinting = false;
		isJumping = false;
	}
	else if (PlayerSpeed > 0) {
		isMoving = true;
	}
	
	if (isMoving == false) {
		setStamina(stamina + (10 * Time.deltaTime));
	}
	if (isWalking == true) {
		setStamina(stamina + (5 * Time.deltaTime));
	}
	if (isSprinting == true) {
		setStamina(stamina - (10 * Time.deltaTime));
	}
	if (isJumping == true) {
		setStamina(stamina - 25);
	}

}

function Move(multiplier : float) {
	
	if (Input.GetKey(KeyCode.W)) {
		rigidbody.velocity.z = speed * multiplier;
	}
	if (Input.GetKey(KeyCode.S)) {
		rigidbody.velocity.z = -(speed * multiplier);
	}
	if (Input.GetKey(KeyCode.A)) {
		rigidbody.velocity.x = -(speed * multiplier);
	}
	if (Input.GetKey(KeyCode.D)) {
		rigidbody.velocity.x = speed * multiplier;
	}
}

function Walk() {
	isWalking = true;
	isSprinting = false;
	Move(1);
}

function Sprint() {
	if ((isMoving == true) && (stamina > 0)) {
		isWalking = false;
		isSprinting = true;
		Move(2);
	}
}

function Jump() {
	isJumping = true;
	if (stamina > 24) {
		setStamina(stamina - 25);
		rigidbody.velocity = transform.up * 5;
	}
	isJumping = false;
}

function OnGUI() {
	GUI.skin = Skin;
	var greenbar = Instantiate(Resources.Load("greenbar"));	
	
	GUI.Label (Rect(10,10, 300, 30), 'Stamina');
	GUI.DrawTexture (Rect(100,23, stamina, 10), greenbar, ScaleMode.StretchToFill, true, 10.0f);
	GUI.Label (Rect(10,30, 300, 30), 'Speed: ' + PlayerSpeed);

}