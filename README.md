# Sistema Ligare - Gerador de Propostas e Ordens de Serviço

Sistema desenvolvido para escritório de contabilidade, com geradores de proposta comercial e ordem de serviço.

## Funcionalidades

- **Página Home**: Interface inicial com logo e acesso aos geradores
- **Gerador de Proposta**: Formulário completo para criação de propostas comerciais
- **Gerador de Ordem de Serviço**: Formulário completo para criação de ordens de serviço
- **Impressão**: Funcionalidade de impressão otimizada para documentos

## Tecnologias

- Next.js 14 (App Router)
- React 18
- TypeScript
- CSS Modules

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no navegador

## Estrutura do Projeto

```
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página home
│   ├── page.module.css     # Estilos da home
│   ├── globals.css         # Estilos globais
│   ├── proposta/
│   │   ├── page.tsx        # Página geradora de proposta
│   │   └── page.module.css # Estilos da proposta
│   └── ordem-servico/
│       ├── page.tsx        # Página geradora de ordem de serviço
│       └── page.module.css # Estilos da ordem de serviço
├── public/
│   └── images/
│       └── logo-ligare-10anos.png  # Logo da empresa
└── package.json
```

## Cores do Sistema

- **Fundo**: #f3f7f5
- **Destaque**: #479f8b (botões, títulos, elementos principais)

## Build para Produção

```bash
npm run build
npm start
```

# ligare-contabilidae
