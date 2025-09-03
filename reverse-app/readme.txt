servizio che tramite:
server.js e express accetta un parametro words e ribalta la parola arrivata in get
utilizza docker per creare image e container
>docker build -t ss-reverse-image .
>docker run --name ss-reverse-cont -p 5511:5511 ss-reverse-image

