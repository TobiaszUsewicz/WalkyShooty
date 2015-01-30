//set times here

var dayduration:float;

//this makes a smooth intensity transition
var phi : float = Time.time / dayduration * 2 * Mathf.PI; var light_amplitude : float = Mathf.Cos( phi ) * 0.5 + 0.5;

//and this will make the light change.

light.intensity = light_amplitude;