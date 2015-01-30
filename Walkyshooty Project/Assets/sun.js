var morning : Color;
var morningIntensity : float;
var noon : Color;
var noonIntensity : float;
var dusk : Color;
var duskIntensity : float;
var night : Color;
var nightIntensity : float;
var t : float;

var morningDuration : int;
var dayDuration : int;
var eveningDuration : int;
var nightDuration : int;

var sp : float;

var cycleLength : float;

function Start () {
	cycleLength = morningDuration + dayDuration + eveningDuration + nightDuration;
}

function Update () {
	t += Time.deltaTime;
	
	light.color = Color.Lerp(currentColor(), nextColor(), sp);
	
	if (t >= cycleLength) {
		t = 0;
	}
}

function stageProgress(t : float) {
	return t / cycleLength;
}

function currentColor() {
	if(t <= morningDuration) {
		return(morning);
	} else if((t > morningDuration) && (t <= morningDuration + dayDuration)) {
		return(noon);
	} else if((t > morningDuration + dayDuration) && (t <= morningDuration + dayDuration + eveningDuration)) {
		return(dusk);
	} else {
		return(night);
	}
}

function nextColor() {
	if(t <= morningDuration) {
		return(noon);
	} else if(t <= morningDuration + dayDuration) {
		return(dusk);
	} else if(t <= morningDuration + dayDuration + eveningDuration) {
		return(night);
	} else {
		return(morning);
	}
}


function morningcyc(duration : float) {
	var thetime;
	light.color = Color.Lerp(light.color, morning, thetime);
}

function nooncyc(duration : float) {
	t = Time.deltaTime;
	light.color = Color.Lerp(light.color, noon, t);
}

function duskcyc(duration : float) {
var t : float = Mathf.Lerp(0, 1, duration / 5);
	light.color = Color.Lerp(light.color, dusk, t);
}

function nightcyc(duration : float) {
var t : float = Mathf.Lerp(0, 1, duration / 5);
	light.color = Color.Lerp(light.color, night, t);
}
