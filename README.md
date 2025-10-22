# Sistema de Gestão de Energia Solar - Frontend

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** - Build tool
- **TailwindCSS** - Estilização
- **React Router** - Roteamento
- **TanStack Query** - Gerenciamento de estado servidor
- **Recharts** - Gráficos
- **Axios** - Requisições HTTP
- **React Hook Form** - Formulários
- **Lucide React** - Ícones

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=seu_google_client_id
```

## 🏃 Executar

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

O frontend estará disponível em `http://localhost:3001`

## 📁 Estrutura de Pastas

```
src/
├── components/       # Componentes reutilizáveis
│   ├── common/      # Botões, inputs, cards
│   ├── layout/      # Header, Sidebar, Footer
│   ├── charts/      # Componentes de gráficos
│   └── auth/        # Componentes de autenticação
├── pages/           # Páginas da aplicação
│   ├── auth/        # Login, registro
│   ├── user/        # Dashboard do usuário
│   └── admin/       # Páginas administrativas
├── services/        # Serviços de API
├── hooks/           # Custom hooks
├── context/         # Contextos React
├── types/           # Tipos TypeScript
├── utils/           # Funções utilitárias
└── routes/          # Configuração de rotas
```

## 👥 Perfis de Usuário

### Usuário Comum
- ✅ Login com email/senha ou Google
- ✅ Dashboard com consumo em kWh
- ✅ Visualizar valor da conta atual
- ✅ Comparativo com/sem energia solar
- ✅ Exportar dados em PDF/Excel

### Administrador
- ✅ Todas as funcionalidades do usuário comum
- ✅ Habilitar/desabilitar novos usuários
- ✅ Ver produção total da usina (diária/mensal)
- ✅ Acessar lista de todos os clientes
- ✅ Ver % de comercialização da usina

## 🔐 Autenticação

O sistema usa JWT tokens com refresh token strategy:

- **Access Token**: Expira em 15 minutos
- **Refresh Token**: Expira em 7 dias
- Renovação automática quando o access token expira

## 📊 Funcionalidades Principais

### Dashboard do Usuário
- Gráfico de consumo mensal (kWh)
- Gráfico comparativo de custos (com/sem solar)
- Cards com estatísticas principais
- Exportação de relatórios

### Dashboard Administrativo
- Gráfico de produção da usina
- Monitoramento de comercialização
- Lista completa de clientes
- Estatísticas gerais do sistema

### Gerenciamento de Usuários (Admin)
- Listagem com busca
- Habilitar/desabilitar usuários
- Visualizar status e perfil
- Estatísticas de usuários ativos/inativos

## 🎨 Personalização

As cores principais podem ser alteradas em `tailwind.config.js`:

```javascript
colors: {
  solar: {
    // Customize suas cores aqui
  }
}
```

## 📱 Responsivo

O layout é totalmente responsivo:
- **Mobile**: Sidebar colapsável
- **Tablet**: Layout adaptado
- **Desktop**: Sidebar fixa com layout completo

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Preview da build
npm run lint     # Executa linter
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Fazer deploy da pasta dist/
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_URL` | URL da API backend | `http://localhost:3000/api` |
| `VITE_GOOGLE_CLIENT_ID` | Client ID do Google OAuth | `123456-abc.apps.googleusercontent.com` |

## 🐛 Troubleshooting

### Erro de CORS
Certifique-se que o backend está configurado para aceitar requisições do frontend.

### Tokens expirados
Limpe o localStorage e faça login novamente:
```javascript
localStorage.clear()
```

### Gráficos não aparecem
Verifique se o Recharts está instalado:
```bash
npm install recharts
```

## 📚 Documentação Adicional

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query)
- [Recharts](https://recharts.org)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.