Rails.application.routes.draw do
	scope defaults: { format: :json } do # force json response as default
  		root to: 'index#index'
  		post '/login', to: 'auth#authenticate_user'
  		post '/register', to: 'auth#register_user'
  	end
end