private var worldPos : Vector3;
private var mouseX : int;
private var mouseY : int;
private var cameraDif : float;
var fpc : GameObject;

function Update () {
	cameraDif = camera.transform.position.y - fpc.transform.position.y;
	
    mouseX = Input.mousePosition.x;
    mouseY = Input.mousePosition.y;

    //this takes your current camera and defines the world position where your mouse cursor is at the height of your character -->translates your onscreen position of mouse into world coordinates
    worldPos = camera.ScreenToWorldPoint(Vector3(mouseX, mouseY, cameraDif));

    fpc.transform.LookAt(worldPos);

}