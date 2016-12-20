Rails.application.routes.draw do
	scope defaults: { format: :json } do # force json response as default
  		root to: 'index#index'
  		post '/sign_in', to: 'auth#authenticate_user'
  		post '/sign_up', to: 'auth#register_user'
  	end
end