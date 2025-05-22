function calculateATK() {
  const base = parseFloat(document.getElementById("atkStat").value) || 0;
  const leader = (parseFloat(document.getElementById("atkLeader").value) || 0) / 100;
  const supportMemory = (parseFloat(document.getElementById("atkSupportMemory").value) || 0) / 100;
  const sot = (parseFloat(document.getElementById("atkSoT").value) || 0) / 100;
  const nonSot = (parseFloat(document.getElementById("atkNonSoT").value) || 0) / 100;
  const support = (parseFloat(document.getElementById("atkSupport").value) || 0) / 100;
  const active = (parseFloat(document.getElementById("atkActive").value) || 0) / 100;
  const eActive = (parseFloat(document.getElementById("atkEActive").value) || 0) / 100;
  const domain = (parseFloat(document.getElementById("atkdomain").value) || 0) / 100;
  const links = (parseFloat(document.getElementById("atkLinks").value) || 0) / 100;
  const kiMulti = (parseFloat(document.getElementById("atkKiMulti").value) || 0) / 100;
  const saMulti = (parseFloat(document.getElementById("atkSAMulti").value) || 0) / 100;
  const saBoost = parseFloat(document.getElementById("atkSABoost").value) || 0;
  const saEffect = (parseFloat(document.getElementById("atkSAEffect").value) || 0) / 100;
  const stacking = (parseFloat(document.getElementById("atkStacking").value) || 0) / 100;

  result = base;
  result = Math.floor(result * (1 + leader));
  result = Math.floor(result * (1 + supportMemory));
  result = Math.floor(result * (1 + sot + support));
  result = Math.floor(result * (1 + links));
  result = Math.floor(result * (1 + active + eActive));
  result = Math.ceil(result * (kiMulti));
  result = Math.floor(result * (1 + nonSot));
  result = Math.round(result * (saMulti + saEffect + stacking + saBoost*(0.05)));
  result = Math.floor(result * (1 + domain));

  document.getElementById("atkResult").textContent = `Result: ${result.toLocaleString()}`;
}

function calculateDEF() {
  const base = parseFloat(document.getElementById("defStat").value) || 0;
  const leader = (parseFloat(document.getElementById("defLeader").value) || 0) / 100;
  const supportmemory = (parseFloat(document.getElementById("defSupportMemory").value) || 0) / 100;
  const sot = (parseFloat(document.getElementById("defSoT").value) || 0) / 100;
  const nonsot = (parseFloat(document.getElementById("defNonSoT").value) || 0) / 100;
  const support = (parseFloat(document.getElementById("defSupport").value) || 0) / 100;
  const active = (parseFloat(document.getElementById("defActive").value) || 0) / 100;
  const eactive = (parseFloat(document.getElementById("defEActive").value) || 0 ) /100;
  const domain = (parseFloat(document.getElementById("defdomain").value) || 0) / 100;
  const links = (parseFloat(document.getElementById("defLinks").value) || 0) / 100;
  const SAEffect = (parseFloat(document.getElementById("defSAEffect").value) || 0) / 100;
  const stacking = (parseFloat(document.getElementById("defStacking").value) || 0) / 100;

  result = base;
  result = Math.floor(result * (1 + leader));
  result = Math.floor(result * (1 + supportmemory));
  result = Math.floor(result * (1 + sot + support));
  result = Math.floor(result * (1 + links));
  result = Math.floor(result * (1 + active + eactive));
  result = Math.floor(result * (1 + nonsot));
  result = Math.floor(result * (1 + SAEffect));
  result = Math.floor(result * (1 + domain));
  result = Math.floor(result * (1 + stacking));

  document.getElementById("defResult").textContent = `Result: ${result.toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('.sa-multiplier-table');
    let lastHighlighted = null;

    table.addEventListener('click', function(e) {
        // Find the closest clicked row
        const row = e.target.closest('tr');
        if (!row || row.parentNode.nodeName === 'THEAD') return;

        // Toggle highlight
        if (lastHighlighted === row) {
            row.classList.remove('highlighted');
            lastHighlighted = null;
        } else {
            if (lastHighlighted) lastHighlighted.classList.remove('highlighted');
            row.classList.add('highlighted');
            lastHighlighted = row;
        }
    });

    // Optional: Clear highlight when clicking outside table
    document.addEventListener('click', function(e) {
        if (!table.contains(e.target)) {
            if (lastHighlighted) {
                lastHighlighted.classList.remove('highlighted');
                lastHighlighted = null;
            }
        }
    });
});
