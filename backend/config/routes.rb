Rails.application.routes.draw do
  resources :lists do
    resources :items, only: [:create, :update, :destroy, :index]
  end
end
