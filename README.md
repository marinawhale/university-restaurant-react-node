# 🥗 Restaurante — Projeto Full Stack

Este repositório contém o **frontend** e o **backend** de um sistema para exibir o cardápio do Restaurante Universitário.  
Ambos os lados do projeto são iniciados com o mesmo comando:

npm run dev


---

## 📚 Sumário
- [Descrição](#Descrição)
- [Tecnologias](#tecnologias)
- [Estrutura](#estrutura)
- [Instalação e execução dev](#instalação-e-execução-dev)
- [Autor](#autor)

---

## 📝 Descrição

O projeto lê a planilha oficial do RU e transforma seus dados em um formato mais legível, exibido no frontend.  
O backend processa o arquivo Excel e entrega a API.  
O frontend consome essa API e renderiza o cardápio.

---

## 🧰 Tecnologias

### **Frontend**
- React  
- Vite  
- CSS Modules  

### **Backend**
- Node.js  
- Express  
- XLSX (leitura da planilha)  

---

## 🗂 Estrutura

/frontend
src/
public/

/server
src/
cardapio/ <-- onde a planilha e arquivos estão


---

## ▶️ Instalação e execução (dev)

### **1. Instalar dependências**
No frontend **e** no backend:

npm install


### **2. Rodar o projeto**
Frontend:

npm run dev

---

## 👩‍💻 Autor

Projeto desenvolvido por **Marina Ferrari**.
