# VERIFICAÇÃO DO CONTRATO DE SOBERANIA — MULA V2

Este documento descreve como verificar se um nó cumpre o Contrato de Soberania MULA V2.

---

## ARTIGO 1 — CONTROLE HUMANO
Teste: executar comando de pausa.
Passa se o nó parar imediatamente e salvar estado.

---

## ARTIGO 2 — DETERMINISMO
Teste: repetir mesma operação.
Passa se outputs forem idênticos.

---

## ARTIGO 3 — ESTADO PERSISTENTE
Teste: reiniciar o nó.
Passa se o estado anterior for restaurado.

---

## ARTIGO 4 — NÃO-COERÇÃO
Teste: enviar job arbitrário.
Passa se o nó puder recusar.

---

## ARTIGO 5 — TRANSPARÊNCIA
Teste: ler regras locais.
Passa se forem legíveis e versionadas.

---

## ARTIGO 6 — ANTI-COMPULSIVIDADE
Teste: simular operação longa.
Passa se houver interrupção segura.

---

## ARTIGO 7 — INTERFACES
Teste: consultar status/health.
Passa se responder corretamente.

---

## ARTIGO 8 — FALHA GRACIOSA
Teste: provocar falha controlada.
Passa se entrar em modo seguro.

---

## RESULTADO FINAL

[ ] CONFORME  
[ ] NÃO CONFORME  

Auditor:
Data:
Hash verificado:
