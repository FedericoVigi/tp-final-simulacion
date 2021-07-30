(function () {

    let simulateBtn = document.getElementById("simulate-btn");
    let weekAgentsInput = document.getElementById('weekAgents')
    let weekendAgentsInput = document.getElementById('weekendAgents')

    simulateBtn.onclick = function () {
        
        let weekAgents = parseInt(weekAgentsInput.value)
        let weekendAgents = parseInt(weekendAgentsInput.value)

        if(isNaN(weekAgents) || isNaN(weekendAgents)){
            alert("Entrada Invalida")
        }
        console.log(weekAgents)
        console.log(weekendAgents)
        //results = simulate(165,145)// pesimista
        //results = simulate(100,80)// real
        //results = simulate(190,160) //  optimo
        results = simulate(weekAgents,weekendAgents)
        generateGraph(results)
    };


})();