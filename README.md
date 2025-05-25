# 💸 MyChips

**MyChips** é um aplicativo de controle de despesas mensais domésticas, desenvolvido em React Native com arquitetura MVVM. Ele permite registrar categorias de gastos, adicionar despesas com filtro por data e visualizar um resumo mensal por meio de gráficos. O app também suporta modo escuro e funciona offline.

---

## 📱 Funcionalidades

- Adição de categorias personalizadas com cor
- Registro de despesas por categoria com data
- Filtro de despesas por período
- Dashboard com gráfico de pizza (gastos por categoria)
- Cálculo de saldo restante do mês
- Armazenamento offline com `AsyncStorage`
- Modo escuro dinâmico com `useColorScheme`
- Navegação estruturada com `React Navigation`
- Arquitetura MVVM com `Zustand`
- Testes com `Jest` + `Testing Library`

---

## 🧱 Tecnologias

- React Native CLI + TypeScript
- Zustand (MVVM ViewModel)
- AsyncStorage
- React Navigation (Stack + Tab)
- React Native Chart Kit
- react-native-uuid
- date-fns

---

## 🚀 Instalação

```bash
# Clonar o projeto
git clone https://github.com/seuusuario/mychips.git
cd mychips

# Instalar dependências
npm install

# Rodar no Android
npx react-native run-android

# Rodar no iOS
cd ios && pod install && cd ..
npx react-native run-ios
```

---

## 🧪 Testes

```bash
# Rodar todos os testes
npm run test
```

Arquivos de teste em `/tests`:
- `useCategoryStore.test.ts`
- `DashboardScreen.test.tsx`
- `CategoriesScreen.test.tsx`
- `ExpensesScreen.test.tsx`

---

## 📸 Prévia

---

## 📂 Estrutura

```
src/
├── models/             # Tipos e interfaces
├── viewmodels/         # Zustand stores (MVVM)
├── views/              # Telas do app
├── components/         # Componentes reutilizáveis
├── services/           # Persistência offline
├── theme/              # Temas e contexto
├── navigation/         # Navegação por stack/tab
```

---

## 👨‍💻 Autor

Desenvolvido por Ester Cunha

