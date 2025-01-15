# Use uma imagem base com Node.js
FROM node:16-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos necessários
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do projeto
COPY . .

# Exponha a porta padrão do Vite (5173)
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]
