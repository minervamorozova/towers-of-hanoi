export class Node{
    constructor(value){
      this.value = value;
      this.next = null;
    }
  }
  
export  class Stack{
    constructor(maxSize){
      this.top = null;
      this.bottom = null;
      this.minValue = null;
      this.maxValue = null;
      this.maxSize = maxSize;
      this.size = 0;
      this.allValues = []
    }
  
    insert(value){
      const newNode = new Node(value);
      if(!this.top){
        this.top = newNode;
        this.bottom = newNode;
        this.minValue = newNode;
        this.maxValue = newNode;
      }else{
        newNode.next = this.top; //Apuntamos al elemento que está en la cima
        this.top = newNode;
        this.minValue = this.checkMin(newNode);
        this.maxValue = this.checkMax(newNode);
      }
      this.size++;
      this.allValues.push(value);
      return this;
    }
  
    peek(){
      return this.top;
    }
  
    isEmpty(){
      return this.size === 0;
    }
  
    isFull(){
      return this.size === this.maxSize;
    }
  
    pop(){ //O(1) -> O(n) peor de los casos
      if(this.size > 0){
        let topNode = this.top;
        if(topNode === this.maxValue){

          this.maxValue = this.nextMaxValue(); //O(n)
        }
        this.top = topNode.next;
        this.size--;
        this.allValues.pop();
        return topNode;
      }
    }
  
    checkMin(node){
      //Comprobar si el nodo que está ingresando es un nodo con el valor más pequeño que se encuentra en la pila
      if(node.value <= this.minValue.value){
        /* Regresamos el nodo que acaba de ingresar indicando 
        * que ese será el más pequeño que ha ingresado en la pila 
        */
        return node; 
      }
      return this.minValue; //Regresamos el nodo con el valor más pequeño de la pila
    }
  
    checkMax(node){
      //Comprobar si el nodo que está ingresando es un nodo con el valor más grande que se encuentra en la pila
      if(node.value > this.maxValue.value){
        /* Regresamos el nodo que acaba de ingresar indicando 
        * que ese será el más grande que ha ingresado en la pila 
        */
        return node; 
      }
      return this.maxValue; //Regresamos el nodo con el valor más pequeño de la pila
    }
  
    nextMaxValue(){
      let currentNode = this.top.next;
      let maxValue = currentNode;
      while(currentNode){
        if(currentNode.value > maxValue.value){
          maxValue = currentNode;
        }
        currentNode = currentNode.next;
      }
      return maxValue;
    } //O(n)
  
    min(){
      return this.minValue.value;
    }
  
    max(){
      return this.maxValue.value;
    }

    traverse(){
      return this.allValues;
    }
  }

  export const StackA = new Stack(3);
  export const StackB = new Stack(3);
  export const StackC = new Stack(3);


  
  