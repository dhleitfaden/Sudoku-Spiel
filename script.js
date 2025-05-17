<script>
  // Beispiel-Puzzle (0 = leer)
  const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  function createGrid() {
    const grid = document.getElementById("sudoku-grid");
    for (let row = 0; row < 9; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 9; col++) {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = "1";
        input.dataset.row = row;
        input.dataset.col = col;

        if (puzzle[row][col] !== 0) {
          input.value = puzzle[row][col];
          input.disabled = true;
          input.classList.add("fixed");
        }

        td.appendChild(input);
        tr.appendChild(td);
      }
      grid.appendChild(tr);
    }
  }

  function checkSolution() {
    const result = document.getElementById("result");
    const grid = [...Array(9)].map(() => Array(9).fill(0));

    // Raccoglie i valori dalla griglia
    document.querySelectorAll("input").forEach(input => {
      const row = parseInt(input.dataset.row);
      const col = parseInt(input.dataset.col);
      const value = parseInt(input.value);
      grid[row][col] = isNaN(value) ? 0 : value;
    });

    // Funzioni di validazione
    function isValidGroup(group) {
      const nums = group.filter(n => n > 0);
      return new Set(nums).size === nums.length;
    }

    // Controllo righe, colonne, e box
    for (let i = 0; i < 9; i++) {
      const row = grid[i];
      const col = grid.map(r => r[i]);
      if (!isValidGroup(row) || !isValidGroup(col)) {
        result.textContent = "❌ Fehler gefunden! Überprüfe deine Eingaben.";
        result.style.color = "red";
        return;
      }
    }

    // Controllo 3x3 box
    for (let r = 0; r < 9; r += 3) {
      for (let c = 0; c < 9; c += 3) {
        const box = [];
        for (let i = 0; i < 3; i++)
          for (let j = 0; j < 3; j++)
            box.push(grid[r + i][c + j]);
        if (!isValidGroup(box)) {
          result.textContent = "❌ Fehler im Block entdeckt!";
          result.style.color = "red";
          return;
        }
      }
    }

    result.textContent = "✅ Gut gemacht! Das Sudoku ist korrekt.";
    result.style.color = "green";
  }

  createGrid();
</script>