document.addEventListener('DOMContentLoaded', function () {
    const givenColors = [
        '#FE2712', '#FC600A', '#FB9902', '#FCCC1A', '#FEFE33', '#B2D732', '#66B032', '#347C98', '#0247FE', '#4424D6',
        '#8601AF', '#C21460', '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80', '#00FFFF', '#0080FF',
        '#0000FF', '#8000FF', '#FF00FF', '#FF0080', '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080',
        '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80'
    ];

    function getRandomColorIndex() {
        return Math.floor(Math.random() * givenColors.length);
    }

    function generateRandomColors(numColors) {
        const colorBox = document.getElementById('colorBox');
        colorBox.innerHTML = ''; // Clear previous colors
        const dashboard = document.querySelector('.content');
        const navbar = document.querySelector('nav');
        
        const assignedColors = [];
        
        for (let i = 0; i < numColors; i++) {
            const randomColorIndex = Math.floor(Math.random() * givenColors.length);
            const color = givenColors[randomColorIndex];
            assignedColors.push(color);
            
            const div = document.createElement('div');
            div.className = 'color-box';
            div.style.backgroundColor = color;
            div.dataset.color = color; // Store color value in dataset
            colorBox.appendChild(div);
            
            if (i === 0) {
                // Set background color for dashboard
                dashboard.style.backgroundColor = color;
            } else if (i === 2) {
                // Set background color for navbar
                navbar.style.backgroundColor = color;
            }
        }
        
        assignColorsToDashboard(numColors, assignedColors);
    }

    function assignColorsToDashboard(numColors, assignedColors) {
        const dashboard = document.querySelector('.content');
        const navbar = document.querySelector('nav');

        switch (numColors) {
            case 2:
                dashboard.style.color = assignedColors[1];
                navbar.style.backgroundColor = assignedColors[1];
                dashboard.style.color = assignedColors[2];
                navbar.style.backgroundColor = assignedColors[2];
                break;
            case 3:
                document.querySelectorAll('.content h2').forEach(function (h2) {
                    h2.style.color = assignedColors[1];
                });
                dashboard.style.color = assignedColors[2];
                break;
            case 4:
                document.querySelectorAll('.content h2').forEach(function (h2) {
                    h2.style.color = assignedColors[1];
                });
                dashboard.style.color = assignedColors[2];
                break;
            case 5:
                document.querySelectorAll('.content h2').forEach(function (h2) {
                    h2.style.color = assignedColors[1];
                });
                dashboard.style.color = assignedColors[2];
                document.querySelectorAll('nav a').forEach(function (link) {
                    link.style.color = assignedColors[3];
                    navbar.style.backgroundColor = assignedColors[4]
                    navbar.style.color = assignedColors[0]
                });
                break;
            default:
                console.error('Invalid number of colors selected.');
        }
    }

    // Function to generate the line chart
    function generateChart() {
        const ctx = document.getElementById('lineChart').getContext('2d');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: givenColors[Math.floor(Math.random() * givenColors.length)], // You can use a random color here
                borderWidth: 2,
                fill: false
            }]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    }

    // Event listener for copying color value when a color box is clicked
    document.getElementById('colorBox').addEventListener('click', function (event) {
        if (event.target.classList.contains('color-box')) {
            const colorValue = event.target.dataset.color; // Retrieve color value from dataset
            navigator.clipboard.writeText(colorValue).then(function () {
                console.log('Color value copied to clipboard:', colorValue);
                alert('Color value copied to clipboard: ' + colorValue);
            }).catch(function (err) {
                console.error('Failed to copy color value:', err);
            });
        }
    });

    // Radio button change event listener
    document.querySelectorAll('input[name="colorOption"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            // Get the selected number of colors
            const numColors = parseInt(this.value);
            generateRandomColors(numColors);
            generateChart(); // Generate chart when colors are updated
        });
    });

    // "Generate Colors" button click event listener
    document.getElementById('generateButton').addEventListener('click', function () {
        const numColors = parseInt(document.querySelector('input[name="colorOption"]:checked').value);
        generateRandomColors(numColors);
        generateChart(); // Generate chart when colors are updated
    });

    // Initial generation of colors and chart
    generateRandomColors(2);
    generateChart();
});
