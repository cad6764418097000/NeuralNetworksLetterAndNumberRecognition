class SquareImage {    // Modification of the matrix function
  constructor(resolution, data=[]){
    this._data = data;
    this._resolution = resolution;

    // Initialize the data with zeros if no data provides
    if(data == null || data.length == 0){
      this._data = [];
      for(let i = 0; i < this._resolution; i++){
        this._data[i] = [];
        for(let j = 0; j < this.resolution; j++){
          this._data[i][j] = 0;
        }
      }
    }else{
      //check data integrity
      if(data.length != resolution || data[0].length != resolution){
        throw new Error("Incorrect Data dimmensions");
      }
    }
  }

  get resolution(){
    return this._resolution;
  }

  get data(){
    return this._data;
  }


}
var image = new SquareImage(4);
var val = [
  [0,1,2,3],
  [0,1,2,3],
  [1,1,2,2],
  [3,3,4,5]
]
console.log(val);
var image = new SquareImage(4, val);
console.log(image);
