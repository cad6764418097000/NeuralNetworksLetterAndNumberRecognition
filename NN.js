// Neural Network
class NeuralNetwork{
  constructor(numInputs, numHidden, numOutputs){
    this._numInputs = numInputs;
    this._numHidden = numHidden;
    this._numOutputs = numOutputs;
    this._weights0 = new Matrix(this._numInputs, this._numHidden);
    this._weights1 = new Matrix(this._numHidden, this._numOutputs);

    // randomise the initial weights
    this._weights0.randomWeights();
    this._weights1.randomWeights();

  }

  get weights0(){
    return this._weights0;
  }
  set weights0(weights){
    this._weights0 = weights;
  }
  get weights1(){
    return this._weights1;
  }
  set weights1(weights){
    this._weights1 = weights;
  }

  feedForward(inputArray){
    // Convert array into MATRIX
    let inputs = Matrix.convertFromArray(inputArray);

    // Find the hidden values and call the activation function
    let hidden = Matrix.dot(inputs, this.weights0);
    hidden = Matrix.map(hidden, x => sigmoid(x));

    // find the output values and apply the activation function
    let outputs = Matrix.dot(hidden, this.weights1);
    outputs = Matrix.map(outputs, x => sigmoid(x));


    return outputs;

    // Apply bias
  }

  train(inputArray, targetArray){
    // feed the input data throgh the network
    let outputs = this.feedForward(inputArray);
    console.table(outputs.data);
    // calculate the output errors (target - outputs)
    let targets = Matrix.convertFromArray(targetArray);
    console.table(targets.data);

    let outputErrors = Matrix.subtract(targets, outputs);
    console.table(outputErrors.data);

    // calculate the deltas errors * the derivitive of the outputslet output
  }
}


function sigmoid(x, deriv = false){
  if(deriv){
    return x * (1 - x); // where x = sigmoid(x)
  }
  return 1/ (1 + Math.exp(-x));
}





/*********************
    MATRIX FUNCTIONS
*********************/

class Matrix {
  constructor(rows, cols, data=[]){
    this._rows = rows;
    this._cols = cols;
    this._data = data;

    // Initialize the data with zeros if no data provides
    if(data == null || data.length == 0){
      this._data = [];
      for(let i = 0; i < this._rows; i++){
        this._data[i] = [];
        for(let j = 0; j < this._cols; j++){
          this._data[i][j] = 0;
        }
      }
    }else{
      //check data integrity
      if(data.length != rows || data[0].length != cols){
        throw new Error("Incorrect Data dimmensions");
      }
    }
  }

  get rows(){
    return this._rows;
  }
  get cols(){
    return this._cols;
  }
  get data(){
    return this._data;
  }


  // add two matrices
  static add(m0, m1){
    Matrix.checkDimensions(m0,m1);

    let m = new Matrix(m0.rows, m0.cols);
    for(let i = 0; i < m.rows; i++){
      for(let j = 0; j < m.cols; j++){
        m.data[i][j] = m0.data[i][j] + m1.data[i][j];
      }
    }
    return m;
  }

  // subtract two matrices
  static subtract(m0, m1){
    Matrix.checkDimensions(m0,m1);

    let m = new Matrix(m0.rows, m0.cols);
    for(let i = 0; i < m.rows; i++){
      for(let j = 0; j < m.cols; j++){
        m.data[i][j] = m0.data[i][j] - m1.data[i][j];
      }
    }
    return m;
  }


  // multiply two matrices (not the dot product)
  static multiply(m0, m1){
    Matrix.checkDimensions(m0,m1);

    let m = new Matrix(m0.rows, m0.cols);
    for(let i = 0; i < m.rows; i++){
      for(let j = 0; j < m.cols; j++){
        m.data[i][j] = m0.data[i][j] * m1.data[i][j];
      }
    }
    return m;
  }

  // find the transpose of the given MATRIX
  static transpose(m0){
    let m = new Matrix(m0.cols, m0.rows);
    for(let i = 0; i < m0.rows; i++){
      for(let j = 0; j < m0.cols; j++){
        m.data[j][i] = m0.data[i][j];
      }
    }
    return m;
  }

  // apply a function to each cell of the given MATRIX
  static map(m0, mFunction){
    let m = new Matrix(m0.rows, m0.cols);
    for(let i = 0; i < m.rows; i++){
      for(let j = 0; j < m.cols; j++){
        m.data[i][j] = mFunction(m0.data[i][j]);
      }
    }
    return m;
  }

  // dot product of 2 matrices
  static dot(m0, m1){
    if(m0.cols != m1.rows){
      throw new Error("matrices are not \"dot\" compatible")
    }
    let m = new Matrix(m0.rows, m1.cols);
    for(let i = 0; i < m.rows; i++){
      for(let j = 0; j < m.cols; j++){
        let sum = 0;
        for(let k = 0; k < m0.cols; k++){
          sum += m0.data[i][k] * m1.data[k][j];
        }
        m.data[i][j] = sum;
      }
    }
    return m;
  }

  // convert array to 1 rowed matrix
  static convertFromArray(arr){
    return new Matrix(1, arr.length, [arr]);
  }

  // check matrces have the same dimensions
  static checkDimensions(m0, m1){
    if(m0.rows != m1.rows || m0.cols != m1.cols){
      throw new Error("Matrices are of different dimensions: Incompatible");
    }
  }

  // Apply random Weights between -1 and 1
  randomWeights(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
  }
}
