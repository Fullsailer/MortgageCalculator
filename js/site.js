function calculateLoan() {
    let loanAmount = parseInt(document.getElementById("loanAmount").value)
    let months = parseInt(document.getElementById("months").value)

    //before the very first month
    let remainingBalance = [loanAmount]

    let interestRate = parseFloat(document.getElementById("interestRate").value)

    //Keep track of interest payments 
    let interest = new Array()

    //Keep track of principal payments
    let principalPayments = new Array()

    //keep track of total interest
    let totalInterest = new Array()
    totalInterest.push(0);

    //Total Monthly Payment                                                          
    let totalMonthlyPayment = (loanAmount) * (interestRate / 1200) / (1 - Math.pow((1 + interestRate / 1200), (-months)))

    //loop iterate user data in months 
    for (let i = 0; i < months; i++) {
        //Interest 
        interest.push((remainingBalance[i]) * (interestRate / 1200))

        //principal payment
        principalPayments.push(totalMonthlyPayment - interest[i])

        //totalInterest
        totalInterest.push(totalInterest[i] + ((totalMonthlyPayment) - (principalPayments[i])))

        remainingBalance.push(remainingBalance[i] - principalPayments[i])
    }

    //Input user data into the table
    let tBody = "";
    for (let i = 0; i < months; i++) {
        tBody += `<tr> <td>${ i+1 }</td>                                                                    
                       <td>$${  ((totalMonthlyPayment * 100) / 100).toFixed(2) }</td>             
                       <td>$${  ((principalPayments[i] * 100) / 100).toFixed(2)   }</td>          
                       <td>$${  ((interest[i] * 100) / 100).toFixed(2) }</td> 
                       <td>$${  ((totalInterest[i+1] * 100) / 100).toFixed(2)   }</td>
                       <td>$${  ((remainingBalance[i+1] * 100) / 100).toFixed(2)   }</td>
                 </tr>`
    }
    document.getElementById("tBody").innerHTML = tBody

    //Monthly Payment
    document.getElementById("monthlyPayment").innerHTML = `$${ (( totalMonthlyPayment *100)/100).toFixed(2)}`

    //Bottom three outputs
    document.getElementById("totalPrincipalOutput").innerHTML = `$${((  loanAmount  *100)/100).toFixed(2)}`
    document.getElementById("totalInterestOutput").innerHTML = `$${((  totalInterest[months]  *100)/100).toFixed(2)}`
    document.getElementById("totalCostOutput").innerHTML = `$${(( (loanAmount + totalInterest[months])  *100)/100).toFixed(2)}`
}