// MAJOR ISSUES:
// #1.  Speed. It is way too slow for its purpose at the moment. I'm a hobyist, not a prefessional, and I just looked up how to implement perlin noise yesterday.
// #2.  I don't understand the octaves very well at all.
//		I added "detailSize", because it determines the scale of the noise in the first octave. I assume after that, octaves becomes smaller, but I'm not sure of the effects.
// #3.  Interpolation is nice, but slow. I might make it linear. It could make it faster.
// #4.  If I want to build terrain based on data this generates, I'll need to create and texture meshes, smooth vertices positions, and speed it up immensley.
var terrainBlocks = 4;
var cube : GameObject;
var detailSize = 8;
var persistence = 0.5;
var octaves = 2;
var terrainSize = 16;
var terrainHeight = 32;
var seeded = 0;
private var t = 0;
//y=3x^2-2x^3; s-curve. slow?
function Curve(a,b,t) {
	return a*(1-t*t*(3.0-2.0*t))+b*t*t*(3.0-2.0*t);
	//return a*(1-t)+b*t;
}

// Seeded noise, based on xyz coordinates. This is essential as it will return the same thing every time it recieves the same input. I just typed in giberish math and seeded it several times based on results to make it random.
function Noise(x,y,z) {
	Random.seed = seeded;
	Random.seed = 57*Random.value*x;
	Random.seed = 29*Random.value*y;
	Random.seed = Random.value*((x+y+z)*(x+z)+z);
	return 2*(Random.value-0.5);
}
// Retrieves the proper noise for a position, and returns it smoothed out, based on adjacent positions.
function SNoise(x,y,z) {
    sides=(Noise(x-1,y,z)+Noise(x+1,y,z)+Noise(x,y-1,z)+Noise(x,y+1,z)+Noise(x,y,z-1)+Noise(x,y,z+1))/12.0;
    center=Noise(x,y,z)/2.0;
    return sides + center;
}

// Finds the nearest integral positions, and interpolates the position it should be at.
function InterpolatedNoise (x,y,z) {
	ix = Mathf.Floor(x);
	fx = x-ix;
	iy = Mathf.Floor(y);
	fy = y-iy;
	iz = Mathf.Floor(z);
	fz = z-iz;
	
	v1 = SNoise(ix,iy,iz); //          ---
	v2 = SNoise(ix+1,iy,iz); //        +--
	v3 = SNoise(ix,iy+1,iz);//         -+-
	v4 = SNoise(ix+1,iy+1,iz);//       ++-
	v5 = SNoise(ix,iy,iz+1);//         --+
	v6 = SNoise(ix+1,iy,iz+1);//       +-+
	v7 = SNoise(ix,iy+1,iz+1);//       -++
	v8 = SNoise(ix+1,iy+1,iz+1);//     +++
	
	i1 = Curve(v1,v2,fx);
	i2 = Curve(v3,v4,fx);
	i3 = Curve(v5,v6,fx);
	i4 = Curve(v7,v8,fx);
	
	i5 = Curve(i1,i2,fy);
	i6 = Curve(i3,i4,fy);
	
	return Curve(i5,i6,fz);
}
// perlin noise algorithm for a position. Octaves itterate through, becomming smaller in scale and weeker.
function Perlin(x,y,z){
	total=0.0;
	for(i=0;i<octaves;i++){
		frq = Mathf.Pow(2,i);
		amp = Mathf.Pow(persistence,i);
		total += InterpolatedNoise(x*frq,y*frq,z*frq)*amp;
	}
	return total;
}
// here I've split the perlin function into blocks. This way, they *can* be saved, although currently are not.
// the reason why I have "+i*terrainSize" in this function is so that the perlin function retrives the information at the correct position for the block it's on:
// (i*terrainSize,0,j*terrainSize) + (d,f,e) = (x,y,z)
function Block(i,j) {
	life = new float[terrainSize,terrainSize,terrainHeight];
	for (d=0.0;d<terrainSize;d++) {
		for (e=0.0;e<terrainSize;e++) {
			for (f=0.0;f<terrainHeight;f++) {
				// define the life value of a block, determined by perlin noise or whatever you want to add in here.
				// If you remove the line using terrainHeight and remove "life[d,e,f] + " in the second line, it will just be 3Dperlin noise.
				life[d,e,f] = 1-2*(f/terrainHeight);
				life[d,e,f] = life[d,e,f] + Perlin((d+i*terrainSize)/detailSize,f/detailSize,(e+j*terrainSize)/detailSize);
			}
		}
	}
// going through this twice, but ideally shouldn't. Perlin would have to be called 7 times as often if I had this part in the last set of for loops.
	for (d=0;d<terrainSize;d++) {
		for (e=0;e<terrainSize;e++) {
			for (f=0;f<terrainHeight;f++) {
				if (life[d,e,f] > 0) {
					// I'm currently instantiating cubes to make up the terrain. I'm hoping to change this into a mesh, and then go through and smooth it out.
					// Blocks are hollow, because I don't want to instantiate ~32,768 cubes, give or take a couple thousand.
					if (d==0||e==0||f==0||d+1==terrainSize||e+1==terrainSize||f+1==terrainHeight) {
							Instantiate(cube,Vector3(d+i*terrainSize,f,e+j*terrainSize),transform.rotation);						
					}	
					else if (life[d,e,f-1]<=0||life[d,e,f+1]<=0||life[d,e-1,f]<=0||life[d,e+1,f]<=0||life[d-1,e,f]<=0||life[d+1,e,f]<=0) {
						cubea = Instantiate(cube,Vector3(d+i*terrainSize,f,e+j*terrainSize),transform.rotation);
					}
					//delete the 6 lines above this and use this part instead if you want the cubes scaled based on the noise (looks like a cloud of cubes)
					//cubea = Instantiate(cube,Vector3(d+i*terrainSize,f,e+j*terrainSize),transform.rotation);
					//cubea.transform.localScale = Vector3(life[d,e,f],life[d,e,f],life[d,e,f]);
				}
			}
		}
	}
	yield;
}
// start, and go through the blocks to create terrain or perlin noise.
function Start () {
	t = Time.realtimeSinceStartup;
	for (i=0;i<terrainBlocks;i++){
		for (j=0;j<terrainBlocks;j++){
			Block(i,j);
		}
	}
}

