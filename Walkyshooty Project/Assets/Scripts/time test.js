var morning : Color;
var morningDuration : float = 1;
var noon : Color;
var noonDuration : float = 1;
var dusk : Color;
var duskDuration : float = 1;
var night : Color;
var nightDuration : float = 1;

function Start () {
    timeOfDay();
}

function timeOfDay () {
	yield morningLight (morningDuration);
        yield noonLight (noonDuration); 
        yield duskLight (duskDuration);
        yield nightLight (nightDuration); 
}

function morningLight (duration : float) {
    var t = 0.0;
    while (t < 1.0) {
        t += Time.deltaTime / morningDuration;
        light.color = Color.Lerp(light.color, morning, t);
        yield;
    }
}

function noonLight (duration : float) {
    var t = 0.0;
    while (t < 1.0) {
        t += Time.deltaTime / noonDuration;
        light.color = Color.Lerp(light.color, noon, t);
        yield;
    }
}

function duskLight (duration : float) {
    var t = 0.0;
    var rate = 1.0/duration;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        light.color = Color.Lerp(light.color, dusk, t);
        yield;
    }
}


function nightLight (duration : float) {
    var t = 0.0;
    var rate = 1.0/duration;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        light.color = Color.Lerp(light.color, night, t);
        yield;
    }
}