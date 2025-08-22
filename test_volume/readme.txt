Dockerfile

FROM alpine:latest
WORKDIR /app
VOLUME /miovol
CMD ["sh"]

> docker build -t ss_test_volume .
> docker run --name ss_test_volume -v c:\Software\Docker\dati_condivisi:/miovol -it ss_test_volume
Se avessi aggiunto come parametri –d avrei poi dovuto fare:

> docker exec -it ss_test_volume sh
In questo caso viene scaricata imagine alpine, creato container ss_test_volume, create cartella /app e /dati

se eseguo 
> cd miovol
> touch miofile.txt 
viene creato nella cartella c:\Software\Docker\dati_condivisi
