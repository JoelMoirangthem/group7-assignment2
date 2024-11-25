// Function to solve LDU
function LDU(id) {
    let X_matrix = X('upperMatrix');

    // Multiply L, D, and X to get LDU
    let first = mult_matrix(L, D, order); 
    let second = mult_matrix(first, X_matrix, order); 
    // Update the page with the LDU matrix
    document.getElementById(id).innerHTML += <h2>LDU matrix </h2> + matrix_format(second);
    document.getElementById(id).innerHTML += <h2>A matrix </h2> + matrix_format(A);
}