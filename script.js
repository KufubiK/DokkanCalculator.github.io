// --- 1. THEME MEMORY LOGIC ---
// --- UPDATED THEME LOGIC ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Sync the button icon with the theme already set by the head script
    const currentTheme = root.getAttribute('data-theme');
    if (themeToggle) {
        themeToggle.innerText = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Enable transitions ONLY for this toggle event
            document.body.classList.add('theme-transition');
            
            const isDark = root.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('dokkan-theme', newTheme);
            themeToggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';

            // Remove the class after the transition finishes (300ms)
            // to keep the initial page loads clean
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 350);
        });
    }
}

// --- 2. TABLE INTERACTION (ROW ONLY) ---
function initTableHighlight() {
    const table = document.querySelector('.sa-multiplier-table table');
    if (!table) return;

    const rows = table.querySelectorAll('tr');
    const cells = table.querySelectorAll('td');
    let selectedCell = null;

    cells.forEach(cell => {
        // Hover: Row only
        cell.addEventListener('mouseover', function() {
            if (!selectedCell) this.parentElement.classList.add('row-highlight');
        });

        cell.addEventListener('mouseout', function() {
            if (!selectedCell) this.parentElement.classList.remove('row-highlight');
        });

        // Click: Select cell and lock Row
        cell.addEventListener('click', function(e) {
            const row = this.parentElement;

            // Deselect logic
            if (selectedCell === this) {
                this.classList.remove('selected');
                row.classList.remove('row-highlight');
                selectedCell = null;
                return;
            }

            // Clear previous selections
            cells.forEach(c => c.classList.remove('selected'));
            rows.forEach(r => r.classList.remove('row-highlight'));

            // Set new selection
            this.classList.add('selected');
            row.classList.add('row-highlight');
            selectedCell = this;
        });
    });
}

// --- 3. CALCULATIONS ---
function calculateATK() {
    const getVal = (id) => parseFloat(document.getElementById(id).value) || 0;

    let result = getVal("atkStat");
    result = Math.floor(result * (1 + getVal("atkLeader") / 100));
    result = Math.floor(result * (1 + getVal("atkSupportMemory") / 100));
    result = Math.floor(result * (1 + (getVal("atkSoT") + getVal("atkSupport")) / 100));
    result = Math.floor(result * (1 + getVal("atkLinks") / 100));
    result = Math.floor(result * (1 + (getVal("atkActive") + getVal("atkEActive")) / 100));
    result = Math.ceil(result * (getVal("atkKiMulti") / 100));
    result = Math.floor(result * (1 + getVal("atkNonSoT") / 100));
    
    // SA Multiplier grouping
    const saSum = (getVal("atkSAMulti") + getVal("atkSAEffect") + getVal("atkStacking")) / 100 + (getVal("atkSABoost") * 0.05);
    result = Math.round(result * saSum);
    result = Math.floor(result * (1 + getVal("atkdomain") / 100));

    document.getElementById("atkResult").textContent = `Result: ${result.toLocaleString()}`;
}

function calculateDEF() {
    const getVal = (id) => parseFloat(document.getElementById(id).value) || 0;

    let result = getVal("defStat");
    result = Math.floor(result * (1 + getVal("defLeader") / 100));
    result = Math.floor(result * (1 + getVal("defSupportMemory") / 100));
    result = Math.floor(result * (1 + (getVal("defSoT") + getVal("defSupport")) / 100));
    result = Math.floor(result * (1 + getVal("defLinks") / 100));
    result = Math.floor(result * (1 + (getVal("defActive") + getVal("defEActive")) / 100));
    result = Math.floor(result * (1 + getVal("defNonSoT") / 100));
    result = Math.floor(result * (1 + getVal("defSAEffect") / 100));
    result = Math.floor(result * (1 + getVal("defdomain") / 100));
    result = Math.floor(result * (1 + getVal("defStacking") / 100));

    document.getElementById("defResult").textContent = `Result: ${result.toLocaleString()}`;
}

// --- 4. TABS & INITIALIZATION ---
function openTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');
    
    contents.forEach(c => c.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTableHighlight();
});
