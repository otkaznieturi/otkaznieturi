Rails.application.routes.draw do
  root to: 'index#index'
  post '/api/sign_in', to: 'auth#authenticate_user'
  post '/api/sign_up', to: 'auth#register_user'
  post '/api/change_pass', to: 'user#change_pass'

  scope '/api' do
    resources :tours, except: [:new, :edit] do
      collection do
        get 'search', to: 'tours#search'
        get 'my_tours', to: 'tours#my_tours'
      end
    end
  end
end
