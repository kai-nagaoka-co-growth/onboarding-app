Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :memos, only: [:index, :show, :create, :update, :destroy] do
        resources :comments, only: [:index, :create]
      end
    end
  end
end
