let form = document.getElementById("investigationForm");

if (form) {

    form.addEventListener("submit", function(event) {

        // Stop the form from refreshing the page
        event.preventDefault();

        // Get detective name
        let name = document.getElementById("detectiveName").value;

        // Get selected suspect
        let selected = document.querySelector(
            'input[name="suspect"]:checked'
        );

        // Make sure a suspect is selected
        if (!selected) {
            alert("Please select a suspect.");
            return;
        }

        let suspect = selected.value;

        // Correct answer
        let correctAnswer = "NICK";

        // Calculate score
        let score = 0;

        if (suspect === correctAnswer) {
            score = 100;
        }

        // Save information in browser
        localStorage.setItem("detectiveName", name);
        localStorage.setItem("suspect", suspect);
        localStorage.setItem("score", score);

        // Go to result page
        window.location.href = "result.html";

    });

}


// ---------- RESULT PAGE ----------

let result = document.getElementById("result");

if (result) {

    // Get saved information
    let name = localStorage.getItem("detectiveName");
    let suspect = localStorage.getItem("suspect");
    let score = localStorage.getItem("score");

    // Correct answer
    let correctAnswer = "NICK";

    // Display result

    if (suspect === correctAnswer) {

        result.innerHTML =
            "<h2>🎉 Congratulations, " + name + "!</h2>" +
            "<p>You suspected <b>" + suspect + "</b>.</p>" +
            "<p>✅ Your answer is correct!</p>" +
            "<h2>🏆 Score: " + score + "/100</h2>";

    } else {

        result.innerHTML =
            "<h2>🔎 Investigation Complete</h2>" +
            "<p>Detective: <b>" + name + "</b></p>" +
            "<p>You suspected: <b>" + suspect + "</b></p>" +
            "<p>❌ Your answer is incorrect.</p>" +
            "<p>The correct suspect was <b>" +
            correctAnswer +
            "</b>.</p>" +
            "<h2>Score: " + score + "/100</h2>";
    }


    // ---------- LEADERBOARD ----------

    // Get previous leaderboard
    let leaderboard =
        JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Add current detective
    leaderboard.push({
        name: name,
        score: Number(score)
    });

    // Sort highest score first
    leaderboard.sort(function(a, b) {
        return b.score - a.score;
    });

    // Save updated leaderboard
    localStorage.setItem(
        "leaderboard",
        JSON.stringify(leaderboard)
    );


    // Display leaderboard
    let leaderboardDiv =
        document.getElementById("leaderboard");

    if (leaderboardDiv) {

        leaderboardDiv.innerHTML = "";

        for (let i = 0; i < leaderboard.length; i++) {

            leaderboardDiv.innerHTML +=
                "<p>" +
                (i + 1) +
                ". " +
                leaderboard[i].name +
                " — " +
                leaderboard[i].score +
                " points</p>";
        }
    }

}