
export const getListOfMovements = (n) => {

    let strA = 'A'
    let strB = 'B'
    let strC = 'C'

    const movements = []

    const moveStr = (n, strA , strC, strB) => {
        
        if(n === 0)
        {   
            return
        }
        else
        {
                    moveStr(n - 1, strA, strB, strC);
                    //targetC.push(sourceA.pop())
                    //console.log('move ', n, ' From ', strA, 'To: ', strC);
                    movements.push( { diskValue: n, source: strA, target: strC  } )
                    moveStr(n - 1, strB, strC, strA);
        }
    }

    moveStr(n, strA , strC, strB);

    return movements;
}