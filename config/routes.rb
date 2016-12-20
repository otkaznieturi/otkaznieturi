Rails.application.routes.draw do
	root to: 'index#index'
  	post '/sign_in', to: 'auth#authenticate_user'
  	post '/sign_up', to: 'auth#register_user'
end