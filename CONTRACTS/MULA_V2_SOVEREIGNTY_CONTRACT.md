# CONTRATO DE SOBERANIA MULA V2

## PREÂMBULO

Este documento não é um contrato legal, nem um smart contract.
É um compromisso técnico-filosófico público.

Um nó que declara conformidade com este contrato afirma:
"Esta máquina opera sob estes princípios. Qualquer violação é falha ou traição operacional."

---

## ARTIGO 1 — CONTROLE HUMANO ABSOLUTO

O nó DEVE permitir pausa total imediata por comando humano explícito.

Requisitos mínimos:
- Interface de pausa (ex: /mula pause)
- Resposta em até 3 segundos
- Estado salvo antes da pausa
- Nenhuma operação continua em background

---

## ARTIGO 2 — DETERMINISMO VERIFICÁVEL

Mesmo input + mesmo estado inicial = mesmo output.

Requisitos:
- Estado persistente
- Logs determinísticos
- Capacidade de replay

Exceções permitidas:
- Timestamp
- IDs não críticos
- Conteúdo externo explicitamente marcado

---

## ARTIGO 3 — ESTADO PERSISTENTE E AUDITÁVEL

Nada significativo pode desaparecer.

Significativo inclui:
- Processamento > 1s
- Comunicação externa
- Mudança de estado
- Decisão que afete output

Requisitos:
- Logs ≥ 7 dias
- Resumos ≥ 90 dias
- Hashes críticos permanentes

---

## ARTIGO 4 — NÃO-COERÇÃO

O nó pode recusar qualquer job ou comando.

Requisitos:
- Mecanismo de recusa
- Sem penalidade por recusa
- Registro opcional

---

## ARTIGO 5 — TRANSPARÊNCIA DAS REGRAS

As regras locais devem ser públicas e versionadas.

Requisitos:
- Arquivo de regras estruturado
- Hash público
- Histórico de mudanças

---

## ARTIGO 6 — ANTI-COMPULSIVIDADE

O nó não entra em loops infinitos.

Requisitos:
- Timeout configurável
- Watchdog
- Interrupção limpa

---

## ARTIGO 7 — INTERFACES DEFINIDAS

As interfaces do nó são documentadas.

Requisitos:
- Status
- Health
- Versão

---

## ARTIGO 8 — FALHA GRACIOSA

Falhas não podem corromper o estado.

Requisitos:
- Checkpoints
- Rollback
- Modo seguro

---

## ASSINATURA DO NÓ

O nó assina este contrato publicando:
- Hash do código
- Hash do estado inicial
- Timestamp
- Endereço público
- Versão do contrato
