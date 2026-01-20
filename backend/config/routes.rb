Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :memos, only: [:index, :create, :update] 
    end
  end
end
