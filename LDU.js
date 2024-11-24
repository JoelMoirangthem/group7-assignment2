// Function to create a diagonal matrix of a given order
function diagonal(id) {
    D = [];
    for (let i = 0; i < order; i++) {
        let diagonal = [];
        for (let j = 0; j < order; j++) {
            diagonal.push(i === j ? U[i][j] : 0);
        }
        D.push(diagonal);
    }
    
    // Display the D matrix in the specified HTML element
    document.getElementById(id).innerHTML = <h2>D matrix </h2> + matrix_format(D);
} 