Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  namespace :api do
    get "search", to: "search#index" # Endpoint de busca
  end
  resources :lists do
    resources :items, only: [:create, :update, :destroy, :index]
  end
end
