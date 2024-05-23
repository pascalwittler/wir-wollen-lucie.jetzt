# wir-wollen-lucie.jetzt

Statistics about book recommendations published by the German radio station _Deutschlandfunk Nova_ including at least one main character with the first name _Lucie_

## Setup with Docker

1. Build the container

```bash
docker build -t wir-wollen-lucie:latest .
```

2. Run the container

```bash
docker run -p 3000:80 wir-wollen-lucie                             # production
docker run -p 3000:80 -v ./public:/var/www/html wir-wollen-lucie   # development
```
