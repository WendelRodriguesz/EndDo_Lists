# syntax=docker/dockerfile:1
# check=error=true

ARG RUBY_VERSION=3.2.2
FROM ruby:$RUBY_VERSION-slim AS base

# Definir diretório de trabalho
WORKDIR /rails

# Instalar pacotes base
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Configurar ambiente para produção
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# Etapa de build
FROM base AS build

# Instalar pacotes necessários para build de gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copiar Gemfile e instalar gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copiar código da aplicação
COPY . .

# Pré-compilar código para bootsnap
RUN bundle exec bootsnap precompile app/ lib/

# Configuração final
FROM base

# Copiar artefatos do build
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Adicionar script wait-for-db.sh e configurar permissões
COPY wait-for-db.sh /rails/wait-for-db.sh
RUN chmod +x /rails/wait-for-db.sh

# Criar usuário não-root para execução
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp /rails/wait-for-db.sh
USER 1000:1000

# Expor porta e comando de inicialização
EXPOSE 3000
CMD ["sh", "-c", "./wait-for-db.sh db && bundle exec rails db:prepare && bundle exec rails server -b 0.0.0.0 -p 3000"]
