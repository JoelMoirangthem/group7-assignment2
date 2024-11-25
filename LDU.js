let A = [];
let L = [];
let D = [];
let U = [];
let I = [];
let EM = [];
let order;

// Function to show each step
function showStep(title, matrixText) {
    let stepDiv = document.createElement("div");
    stepDiv.className = "step";
    stepDiv.innerHTML = `<strong>${title}:</strong><pre class="matrix-display">${matrixText}</pre>`;
    document.getElementById("steps").appendChild(stepDiv);
}

// Function to format the matrix for display
function matrix_format(matrix) {
    let new_matrix = "";
    for (let row of matrix) {
        new_matrix += "| ";
        for (let element of row) {
            new_matrix += `${element} `;
        }
        new_matrix += "| <br>";
    }
    return new_matrix;
}

// Function to create a matrix based on user input
function show_matrix(id) {
    order = parseInt(document.getElementById("order").value);
    A = [];
    for (let i = 1; i <= order; i++) {
        let matrix = [];
        for (let j = 1; j <= order; j++) {
            let matrix_element = parseInt(prompt(`Enter the a${i}${j}`));
            matrix.push(matrix_element);
        }
        A.push(matrix);
    }
    
    document.getElementById(id).innerHTML = `<h2>Matrix A</h2>` + matrix_format(A);
}

// Function to create an identity matrix of a given order
function Identity(order) {
    I = [];
    for (let i = 0; i < order; i++) {
        let identity = [];
        for (let j = 0; j < order; j++) {
            identity.push(i === j ? 1 : 0);
        }
        I.push(identity);
    }
    return I;
}



// Function for multiplication of two matrices
function mult_matrix(M1, M2, order) {
    let result = [];
    for (let i = 0; i < order; i++) {
        let temp_mult = [];
        for (let j = 0; j < order; j++) {
            let summ = 0;
            for (let k = 0; k < order; k++) {
                summ += M1[i][k] * M2[k][j];
            }
            temp_mult.push(summ);
        }
        result.push(temp_mult);
    }
    return result;
}

// Function to calculate the elimination matrix
function cal_eli(id) {
    const order = parseInt(document.getElementById("order").value);
    U = A.map(row => [...row]); // Copy matrix A into U
    document.getElementById("steps").innerHTML = ""; 
    
    EM = Identity(order);
    for (let i = 0; i < order; i++) {
        let temp_EM = Identity(order);
        for (let j = i + 1; j < order; j++) {
            let mult_factor = -U[j][i] / U[i][i];
            temp_EM = Elimination_Matrix(j, i, mult_factor, order);
            showStep(`Elimination Matrix ${j+1}${i+1}`, matrix_format(temp_EM));
            EM = mult_matrix(temp_EM, EM, order);
            for (let k = 0; k < order; k++) {
                U[j][k] += mult_factor * U[i][k];
            }
        }
    }
    showStep("E<sub>21</sub>E<sub>31</sub>E<sub>32</sub>", matrix_format(EM));
    showStep("U", matrix_format(U));
}


// Function 
function X(id) {
    let X = [];
    for (let i = 0; i < order; i++) {
        let temp_X = [];
        for (let j = 0; j < order; j++) {
            let temp = U[i][j] / D[i][i]; // Correct calculation
            temp_X.push(temp);
        }
        X.push(temp_X);
    }

    // Now we correctly display U' matrix
    document.getElementById(id).innerHTML = `<h2>U' matrix </h2>` + matrix_format(X);
    return X; // Return X matrix so we can use it in LDU computation
}

// Function to solve for L Matrix
function L_Matrix(id) {
    L = Identity(order);
    for (let i = 0; i < order; i++) {

        let div = EM[i][i];
        for (let j = 0; j < order; j++) {
            L[i][j] /= div;
            EM[i][j] /= div;
        }

        for (let k = 0; k < order; k++) {
            if (k != i) {
                let mfac = -(EM[k][i] / EM[i][i]);
                for (let m = 0; m < order; m++) {
                    EM[k][m] += mfac * EM[i][m];
                    L[k][m] += mfac * L[i][m];
                }
            }
        }
    }
    
    document.getElementById(id).innerHTML += `<h2>EM matrix </h2>` + matrix_format(EM);
    document.getElementById(id).innerHTML += `<h2>L matrix </h2>` + matrix_format(L);
}

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
    document.getElementById(id).innerHTML = "<h2>D matrix </h2>" + matrix_format(D);
} 


// Function to solve LDU
function LDU(id) {
    let X_matrix = X('upperMatrix');

    // Multiply L, D, and X to get LDU
    let first = mult_matrix(L, D, order); 
    let second = mult_matrix(first, X_matrix, order); 
    // Update the page with the LDU matrix
    document.getElementById(id).innerHTML += "<h2>LDU matrix </h2>" + matrix_format(second);
    document.getElementById(id).innerHTML += "<h2>A matrix </h2> "+ matrix_format(A);
}
// Function to create an elimination matrix
function Elimination_Matrix(row, col, value, order) {
    let temp_matrix = Identity(order);
    temp_matrix[row][col] = value;
    return temp_matrix;
}