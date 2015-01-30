var bullet : Rigidbody;
var spark : Rigidbody;
var obj : GameObject;
var bulletVelocity : int;
var firesound : AudioClip;
var terrainCollision : GameObject;

function shootBullet() {

	clone = Instantiate(bullet, transform.position, transform.rotation);
	clone.velocity = transform.TransformDirection(Vector3(0,0, bulletVelocity));
	
	audio.PlayOneShot(firesound);
	Destroy(clone.gameObject, 2);
	
}

function shootSparks (quantity : int) {

    for (var i : int = 0; i<quantity; i++) {
        sparkclone = Instantiate(spark, transform.position, transform.rotation);
		sparkclone.velocity = transform.TransformDirection(Vector3(Random.Range(-1,1),0, Random.Range(2.0,5)));
	    Destroy(sparkclone.gameObject, Random.Range(1.0,3));
    }

}

function spawnObj() {
	var randomRotation = Quaternion.Euler(Random.Range(-15, 15), Random.Range(0, 360) , Random.Range(-15, 15));
	var randomVal = Random.Range(2.2,3.5);
	var randomScale = Vector3(randomVal, randomVal, randomVal);
	treeclone = Instantiate(obj, transform.position, randomRotation);
	treeclone.transform.localScale = randomScale;
}

function Update () {

	var randomNumber = Random.Range(0,4);

	if (Input.GetKeyDown(KeyCode.Mouse0)) {
		shootBullet();
		shootSparks(randomNumber);
	}
	
	if (Input.GetKeyDown(KeyCode.Mouse1)) {
		spawnObj();
	}
	
}