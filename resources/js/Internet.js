Neutralino.window.setTitle("Internet - Ajustes");



let networkStats = Neutralino.os.execCommand("ifconfig");
networkStats.then(result => {
    let networkStats = result.stdOut
    console.log(networkStats);
    document.getElementById('netstats').innerHTML = networkStats;
}
);

Neutralino.os.execCommand('nmcli -t -f TYPE,STATE dev | grep \'wifi:connected\'')
    .then(result => {
        if (result.stdOut.trim() === '') {
            document.getElementById('redes').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error al ejecutar nmcli -t -f TYPE,STATE dev | grep \'wifi:connected\':', error);
    });

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