//var target : Transform; 
//var relativePosition : Vector3;

var dampTime : float = 0.3; //offset from the viewport center to fix damping
var camHeight : float;
private var velocity = Vector3.zero;
var target : Transform;

function Update() {
    if(target) {
        var point : Vector3 = camera.WorldToViewportPoint(target.position);
        var delta : Vector3 = target.position -
                    camera.ViewportToWorldPoint(Vector3(0.5, 0.5, 12));
        var destination : Vector3 = transform.position + delta;
        transform.position = Vector3.SmoothDamp(transform.position, destination, 
                                                velocity, dampTime);
    }
}