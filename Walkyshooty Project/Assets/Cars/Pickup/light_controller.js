var canPlayAudio = true;
var lightswsound : AudioClip;

private var lightOn : boolean = false;
var light1:Light;
var light2:Light;
var light3:Light;
var light4:Light;

function Update()
{

if (Input.GetKeyDown ("l"))
{
lightOn = !lightOn;
light1.enabled = lightOn;
light2.enabled = lightOn;
light3.enabled = lightOn;
light4.enabled = lightOn;
audio.Play();
    }
}