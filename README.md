## 💰 ControleJá - Interface Web

![ControleJá Banner](public/ControleJa.png)

Aplicação frontend para controle financeiro pessoal e de pequenos negócios, construída com React, TypeScript e Vite.
Permite visualizar saldo, receitas, despesas, categorias e relatórios gráficos de forma simples e intuitiva.

---

## 🌐 Aplicação Online
**🔗 Site:** [https://controleja.jardsonflorentino.com.br/](https://controleja.jardsonflorentino.com.br/)

---

## 📝 Descrição

A interface web do ControleJá é o frontend de uma plataforma de finanças que ajuda usuários a organizarem despesas e receitas mensais.

O projeto foi desenvolvido como parte do curso Full Stack do DevClub, com foco em boas práticas modernas de frontend:

- Dashboard financeiro com cards de saldo, receitas e despesas
- Gráficos interativos para análise por categoria e histórico mensal
- Filtros por mês/ano e categorização de transações
- Integração com API própria (backend Fastify + Prisma)
- Autenticação via Firebase (quando configurada)

---

## 🚀 Funcionalidades (Frontend)

✅ Dashboard com:

- Saldo total do mês (incluindo saldo acumulado de meses anteriores)
- Total de receitas e despesas do mês
- Despesas por categoria em gráfico de pizza
- Histórico mensal em gráfico de barras

✅ Tela de transações:

- Listagem de entradas e saídas
- Filtro por mês e ano
- Busca por descrição
- Destaque visual para receitas (verde) e despesas (vermelho)

✅ Cadastro de transações:

- Seleção de tipo (receita/despesa)
- Descrição, valor, data e categoria
- Validação básica de campos e feedback com toasts

✅ Layout responsivo:

- Tema escuro moderno
- Interface otimizada para desktop e uso em notebooks

---

## 🛠️ Stack Tecnológica (Frontend)
React 19.x – Biblioteca para construção da interface

- TypeScript – Tipagem estática no frontend
- Vite – Ferramenta de build e dev server
- Tailwind CSS 4 – Estilização utilitária e responsiva
- Lucide React – Ícones modernos
- React Router DOM 7 – Roteamento SPA
- Axios – Cliente HTTP para consumir a API
- React Toastify – Notificações (sucesso/erro)
- Recharts – Gráficos (pizza, barras) para relatórios

---

## 📦 Instalação Local (Frontend)

Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend do ControleJá rodando localmente (API)

Passos
