self.addEventListener('install', e => {
    console.log('Install');
});

self.addEventListener('fetch', e => {
    console.log('Fetch');
});