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

            // Replace * in the first column with <span class="symbol">check_circle</span> and make the text bold
            if (columns[0] === '*') {
                columns[0] = '<span class="symbol">check_circle</span>';
            }

            // Replace the last number of the row based on the conditions
            let lastElement = columns[columns.length - 1];
            if (!isNaN(lastElement)) {
                let lastNumber = parseInt(lastElement);
                if (lastNumber < 10) {
                    columns[columns.length - 1] = '<span class="symbol">network_wifi_0_bar</span>';
                } else if (lastNumber >= 11 && lastNumber <= 20) {
                    columns[columns.length - 1] = '<span class="symbol">network_wifi_1_bar</span>';
                } else if (lastNumber >= 21 && lastNumber <= 40) {
                    columns[columns.length - 1] = '<span class="symbol">network_wifi_2_bar</span>';
                } else if (lastNumber >= 41 && lastNumber <= 70) {
                    columns[columns.length - 1] = '<span class="symbol">network_wifi_3_bar</span>';
                } else if (lastNumber >= 71) {
                    columns[columns.length - 1] = '<span class="symbol">signal_wifi_4_bar</span>';
                }
            }

            let smalllist = document.createElement('div');
            smalllist.className = 'smalllist';
            smalllist.innerHTML = '<strong>' + columns.join(' ') + '</strong>'; // Use innerHTML to render the HTML tag

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