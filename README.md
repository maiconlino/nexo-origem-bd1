# NEXO ORIGEM — Banco de Dados I
Jogo web de ação e exploração para **Engenharia de Software, 4º período, UPE Surubim**. Versão independente de NEXO: personagem controlável, combate, esquiva, transporte de objetos, sete distritos e chefe final. Usa ilustrações originais da série NEXO e a composição original **Primeiro Pulso**, sintetizada no navegador.

## Jogar
Nome completo e e-mail são obrigatórios. O aviso inicial informa que a melhor partida completa pode valer bônus definido pelo professor. Use o mesmo e-mail nas tentativas. Computador: WASD/setas, J/espaço para atacar, E para interagir, Shift para esquiva, Q para soltar, Esc para pausa. Celular: direcional e botões de toque. Na horizontal há mais espaço.

A soma dos sete distritos vale até 1.000 pontos. Decisões incorretas retiram 5 pontos (até 40 por distrito), resgates retiram 2 (até 10). Tempo e dicas não retiram pontos. O jogador pode reiniciar o distrito pela pausa ou fazer novas partidas ilimitadas. Um distrito é salvo apenas após concluir seus objetivos e atravessar o portal. Ao fechar a página, uma região em andamento reinicia. Por proteção de recursos, o registro de comandos de cada distrito tem limite de duas horas de simulação; reiniciar o distrito renova esse limite.

## Conteúdo integrado às missões
1. **Arquivo fragmentado — aula 1:** reconciliar a versão atual do estoque, reconectar duas aplicações à mesma fonte e recuperar a definição das colunas. Arquivos, inconsistência, SGBD, esquema e instância.
2. **Rede sob pressão — aula 2:** encaminhar pedido à aplicação e SQL ao SGBD, evitar dupla reserva da última vaga e reconstruir um índice no nível interno. Camadas, processamento de consultas, concorrência e independência física.
3. **Portas da integridade — aula 3:** transportar seis registros ao cadastro ou à correção, observando PK nula/duplicada, FK órfã e domínio inválido. FKs repetidas são permitidas; excluir um pai referenciado é bloqueado.
4. **Ponte de Chen — aula 4:** construir entidades, atributo e relacionamento com as formas da notação Chen; instalar ramificadores e testar três vínculos que exigem N:M.
5. **Armazém das cópias — aula 5:** separar listas em itens atômicos; distribuir atributos por seus determinantes; instalar a FK no lado N e a chave composta na tabela associativa. 1FN, dependência parcial/2FN e transitiva/3FN.
6. **Forja SQL — aula 6:** criar tabela tipada, inserir registros, conferir filtros com SELECT, reparar uma linha com UPDATE e remover outra com DELETE. DROP remove a estrutura; DELETE preserva a tabela. É possível reconstruir após um erro.
7. **Guardião do tudo ou nada — aula 7:** conectar LEFT JOIN, GROUP BY/SUM e HAVING; transferir energia sob falha injetada, ROLLBACK e COMMIT. Só a consulta correta e a operação íntegra liberam o chefe.

As simulações representam conceitos selecionados das sete aulas, não executam um SGBD SQL completo e não substituem o estudo dos materiais. A prova foi usada apenas para orientar a cobertura; os PDFs, a prova e seu gabarito não fazem parte do repositório. Alguns anexos indicavam 3º período; a interface segue o 4º período informado pelo professor.

## Resultados e privacidade
`/professor` exige autenticação ChatGPT e autorização pelo e-mail configurado em `TEACHER_EMAIL`. A melhor partida concluída por e-mail, histórico e CSV são restritos ao professor. Identificação é autodeclarada. Não há ranking público com dados pessoais. Este Site usa banco D1 e cookie próprios, separados da versão de Banco de Dados II.

O servidor reexecuta o registro de comandos com o mesmo motor determinístico, verifica a conclusão e calcula o score. Usa cookie HttpOnly, consultas parametrizadas, revisão otimista e reenvio idempotente de checkpoints. Não se promete impedir toda automação de partidas.

## Executar e verificar
Requer Node.js >=22.13 e npm. Instale com `npm ci`. Configure `TEACHER_EMAIL` localmente em `.env` e `.dev.vars` seguindo `.env.example`, execute `npm run dev` e aplique as migrações Drizzle no D1 local. `npm run build` gera o Worker e os arquivos estáticos. O projeto usa React, Vinext/Vite, Cloudflare Workers e D1; a hospedagem estática isolada não oferece cadastro e resultados.

`node tests/arcade.mjs` percorre os sete distritos por comandos reais de movimento, combate e interação; compara a reexecução no servidor, checkpoints, score e restrição da área docente. `node tests/mechanics.mjs` verifica consequências e recuperação de erros. Os testes de API usam apenas `http://localhost:5173`; não cadastrar testes na produção.

Arquivos principais: `lib/arcade/world.ts` (simulação compartilhada), `lib/arcade/render.ts` (arena), `components/arcade.tsx` (controles), `app/api/game/route.ts` (registro), `lib/sound.ts` (composição). As imagens estão em `public/`. Valores de ambiente e registros dos jogadores não são versionados.
