    var crosshairTexture : Texture2D;

function Update () {
    Screen.showCursor = false;
}

function OnGUI () 
{
    var mousePos = Event.current.mousePosition;

    mousePos.x = Mathf.Clamp(mousePos.x, 0, Screen.width);
    mousePos.y = Mathf.Clamp(mousePos.y, 0, Screen.height);

    GUI.DrawTexture( Rect( mousePos.x - (crosshairTexture.width/2),
                           mousePos.y - (crosshairTexture.height/2),
                           crosshairTexture.width,
                           crosshairTexture.height), crosshairTexture);
}