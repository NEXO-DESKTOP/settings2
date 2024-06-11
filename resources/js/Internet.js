Neutralino.window.setTitle("Internet - Ajustes");



let networkStats = Neutralino.os.execCommand("ifconfig");
networkStats.then(result => {
    let networkStats = result.stdOut
    console.log(networkStats);
    document.getElementById('netstats').innerHTML = networkStats;
}
);

setInterval(() => {
    Neutralino.os.execCommand('nmcli -t -f TYPE,STATE dev | grep \'wifi:connected\'')
        .then(result => {
            if (result.stdOut.trim() === '') {
                document.getElementById('togglewifi').checked = false
            }else{
                document.getElementById('togglewifi').checked = true
            }
        })
        .catch(error => {
            console.error('Error al ejecutar nmcli -t -f TYPE,STATE dev | grep \'wifi:connected\':', error);
        });
}, 500); // 5000 milisegundos = 5 segundos



function updateWifiList() {
    Neutralino.os.execCommand('nmcli dev wifi list').then(result => {
        let outputLines = result.stdOut.split('\n');
        let netlist = document.getElementById('netlist');
        netlist.innerHTML = ''; // Clear the list

        // Skip the first line
        for (let i = 1; i < outputLines.length; i++) {
            let line = outputLines[i];
            let columns = line.split(/\s{2,}/); // Split by two or more whitespace

            // Skip lines that have -- in the second or third column
            if (columns[1] === '--' || columns[2] === '--') {
                continue;
            }

            // Skip empty lines
            if (columns.join('').trim() === '') {
                continue;
            }

            columns = columns.filter((_, index) => ![1, 3, 4, 5, 7, 8].includes(index)); // Omit columns 2, 4, 5, 6, 8, 9

            // Replace * in the first column with <p class="symbol">check_circle</p> and make the text bold
            if (columns[0] === '*') {
                columns[0] = '<p class="symbol">check_circle</p>';
                columns[1] = '<strong>' + columns[1] + '</strong>'; // Make the text bold
            }

            // Find the last number in the columns
            let lastNumberMatch = columns[columns.length - 1].match(/(\d+)(?!.*\d)/);
            if (lastNumberMatch) {
                let lastNumber = parseInt(lastNumberMatch[1]);

                // Replace the last number with the appropriate wifi symbol
                if (lastNumber < 10) {
                    columns[columns.length - 1] = columns[columns.length - 1].replace(lastNumber, '<p class="symbol">network_wifi_0_bar</p>');
                } else if (lastNumber >= 11 && lastNumber <= 20) {
                    columns[columns.length - 1] = columns[columns.length - 1].replace(lastNumber, '<p class="symbol">network_wifi_1_bar</p>');
                } else if (lastNumber >= 21 && lastNumber <= 40) {
                    columns[columns.length - 1] = columns[columns.length - 1].replace(lastNumber, '<p class="symbol">network_wifi_2_bar</p>');
                } else if (lastNumber >= 41 && lastNumber <= 70) {
                    columns[columns.length - 1] = columns[columns.length - 1].replace(lastNumber, '<p class="symbol">network_wifi_3_bar</p>');
                } else if (lastNumber >= 71) {
                    columns[columns.length - 1] = columns[columns.length - 1].replace(lastNumber, '<p class="symbol">signal_wifi_4_bar</p>');
                }
            }

            let smalllist = document.createElement('div');
            smalllist.className = 'smalllist';
            smalllist.innerHTML = columns.join(' '); // Use innerHTML to render the HTML tag

            netlist.appendChild(smalllist);
        }
    });
}
updateWifiList();
setInterval(updateWifiList, 60000); // Update the list every 60 seconds

document.getElementById('togglewifi').addEventListener('click', () => {
    if (document.getElementById('togglewifi').checked) {
        Neutralino.os.execCommand('nmcli radio wifi on');
        document.getElementById('redes').style.display = 'block';
        updateWifiList(); // Update the list immediately


    }
    else {
        Neutralino.os.execCommand('nmcli radio wifi off');
    }
}
);

let wifiCards;

Neutralino.os.execCommand('nmcli device status | grep wifi').then(result => {
    let outputLines = result.stdOut.split('\n');
    wifiCards = outputLines
    .filter(line => line.trim() !== '')
    .map(line => line.split(' ')[0]);
    let select = document.getElementById('adapters');
    wifiCards.forEach(card => {
        let option = document.createElement('option');
        option.value = card;
        option.text = card;
        select.add(option);
});
});


document.getElementById('opennet').addEventListener('click', () => {
    Neutralino.os.execCommand('nm-connection-editor', {background: true});
}
);


document.getElementById('zeromoreinfo').addEventListener('click', () => {
    Neutralino.os.open('https://zeronet.io');


});

document.getElementById('speedtest').addEventListener('click', () => {
    Neutralino.os.open('https://fast.com');
});

document.getElementById('tormoreinfo').addEventListener('click', () => {
    Neutralino.os.open('https://www.torproject.org/about/history/');
});