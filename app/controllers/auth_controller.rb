class AuthController < ApplicationController
	def authenticate_user
	    user = User.find_for_database_authentication(email: params[:email])
	    if user && user.valid_password?(params[:password])
	      	render json: payload(user)
	    else
	      	render json: {errors: ['Неверный email/пароль']}, status: :unauthorized
	    end
  	end

  	def register_user
	    user = User.new(user_params)
	    user.save
	    if user.persisted?
	      if user.active_for_authentication?
	        render json: payload(user)
	      end
	    else
	      render json: {errors: user.errors.messages.values}, status: :unauthorized
	    end
  	end

  	private

  	def user_params
		params.permit(:email, :password, :password_confirmation)
	end

  	def payload(user)
	    return nil unless user and user.id
	    {
	      auth_token: JsonWebToken.encode({user_id: user.id}),
	      user: {id: user.id, email: user.email}
	    }
  	end
end
