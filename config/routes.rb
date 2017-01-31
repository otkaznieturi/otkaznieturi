Rails.application.routes.draw do
  root to: 'index#index'
  post '/api/sign_in', to: 'auth#authenticate_user'
  post '/api/sign_up', to: 'auth#register_user'
  post '/api/change_pass', to: 'user#change_pass'
  put '/api/change_subscribe', to: 'user#change_subscribe'
  get '/api/users', to: 'user#users'
  delete '/api/delete_users', to: 'user#delete_users'
  get '/api/activate_account', to: 'user#activate'

  scope '/api' do
    resources :tours, except: [:new, :edit] do
      collection do
        get 'search', to: 'tours#search'
        get 'my_tours', to: 'tours#my_tours'
        get 'today_tours', to: 'tours#today_tours'
        get 'counters', to: 'tours#tours_counters'
        get 'available_countries', to: 'tours#available_countries'
      end
    end
  end
end
