// Initialize Neutralino
Neutralino.init();


function onWindowClose() {
    Neutralino.app.exit();
}


document.getElementsByClassName('left-panel')[0].innerHTML = `
<div class="hello-head">
Ajustes
</div>
<div class="card-container">
<br>
<div id="network" class="card">
    
    <img class="card-image" src="/icons/network.svg" alt="ajustes">
    
    <div class="vcard">
        <div class="card-title">
            Internet
        </div>
        <br>
        <div class="card-desc">
            Conexiones de red.
        
        </div>
    </div>
</div>
<div id="devices" class="card">
    
    <img class="card-image" src="/icons/devices.svg" alt="ajustes">
    
    <div class="vcard">
        <div class="card-title">
            Dispositivos
        </div>
        <br>
        <div class="card-desc">
            Administrar Dispositivos.
        
        </div>
    </div>
</div>
<div id="vision" class="card">
    
    <img class="card-image" src="/icons/vision.svg" alt="ajustes">
    
    <div class="vcard">
        <div class="card-title">
            Pantalla
        </div>
        <br>
        <div class="card-desc">
            Fondo, Resolución, Protec...
        
        </div>
    </div>
</div>
<div id="audio" class="card">
    
    <img class="card-image" src="/icons/audio.svg" alt="ajustes">
    
    <div class="vcard">
        <div class="card-title">
            Audio
        </div>
        <br>
        <div class="card-desc">
            Altavoces y micrófonos.
        
        </div>
    </div>
</div>
<div id="energy" class="card">
    
    <img class="card-image" src="/icons/energy.svg" alt="ajustes">
    
    <div class="vcard">
        <div class="card-title">
            Energía
        </div>
        <br>
        <div class="card-desc">
            Consumo, Batería, Ahorro ...
        
        </div>
    </div>
</div>
<div id="users" class="card">
    
    <img class="card-image" src="/icons/usuarios.svg" alt="ajustes">
    
    <div class="vcard">
        <div class="card-title">
            Usuarios
        </div>
        <br>
        <div class="card-desc">
            Personas en este dispositivo.
        
        </div>
    </div>
</div>
<div id="online" class="card">
    
    <img class="card-image" src="/icons/online.svg" alt="ajustes">
    
    <div class="vcard">
        <div class="card-title">
            Cuentas Online
        </div>
        <br>
        <div class="card-desc">
            Conexión con cuentas exter...
        
        </div>
    </div>
</div>
<div id="guests" class="card">
    
    <img class="card-image" src="/icons/guests.svg" alt="ajustes">
    
    <div class="vcard">
        <div class="card-title">
            Invitados
        </div>
        <br>
        <div class="card-desc">
            Administra software externo.
        
        </div>
    </div>
</div>
<div id="myos" class="card">
    
    <img class="card-image" src="/icons/network.svg" alt="ajustes">
    
    <div class="vcard">
        <div class="card-title">
            Mi Sistema
        </div>
        <br>
        <div class="card-desc">
            Información del sistema.
        
        </div>
    </div>
</div>
`;

document.getElementById('network').addEventListener('click', function() {
    window.location.href = 'Internet.html';
});

document.getElementById('devices').addEventListener('click', function() {
    window.location.href = 'Devices.html';
});

document.getElementById('vision').addEventListener('click', function() {
    window.location.href = 'Vision.html';
});