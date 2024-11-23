// script.js

// Function to fetch additives data from JSON file
let additivesData = [];

fetch('additives.json')
    .then(response => response.json())
    .then(data => {
        additivesData = data;
    })
    .catch(error => {
        console.error('Error fetching additives data:', error);
    });

// Handle the search form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const additiveName = document.getElementById('additive-name').value.trim();
    if (additiveName) {
        displayResults(additiveName);
    }
});

// Function to display search results
function displayResults(additiveName) {
    const result = additivesData.find(item =>
        item.name.includes(additiveName) || item.alias.includes(additiveName)
    );

    if (result) {
        document.getElementById('additive-title').textContent = `添加物名：${result.name}`;
        document.getElementById('additive-alias').textContent = result.alias || 'なし';
        document.getElementById('additive-benefits').textContent = result.benefits || '情報なし';
        document.getElementById('additive-demerits').textContent = result.demerits || '情報なし';
    } else {
        document.getElementById('additive-title').textContent = '該当する添加物が見つかりませんでした。';
        document.getElementById('additive-alias').textContent = '';
        document.getElementById('additive-benefits').textContent = '';
        document.getElementById('additive-demerits').textContent = '';
    }

    // Show results page and hide search page
    document.getElementById('search-page').style.display = 'none';
    document.getElementById('results-page').style.display = 'block';
}

// Handle the home button click
document.getElementById('home-button').addEventListener('click', function() {
    // Clear the search input
    document.getElementById('additive-name').value = '';

    // Hide results page and show search page
    document.getElementById('results-page').style.display = 'none';
    document.getElementById('search-page').style.display = 'block';
});
