using UnityEngine;
using System.Collections;

public class GenerateTiles : MonoBehaviour {

   public int board_size_x_;
   public int board_size_z_;
   public Transform tile_grass;
 
   // Use this for initialization
   void Start () {
      GameObject board = new GameObject();
      board.name = "Board";
      for ( int x = -25; x < board_size_x_; x++ ) {
         for ( int z = -25; z < board_size_z_; z++ ) {
	            Transform tile = (Transform)Instantiate(tile_grass,new Vector3(x,0,z),Quaternion.identity);
	            tile.name = "Tile" + x + z;	            
	            tile.parent = board.transform;
	        }
         }
      }
   }
