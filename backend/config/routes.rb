Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  resources :lists do
    resources :items, only: [:create, :update, :destroy, :index]
  end
end
