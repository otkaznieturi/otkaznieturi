class AuthController < ApplicationController
	def authenticate_user
	    user = User.find_for_database_authentication(email: params[:email])
	    if user && user.valid_password?(params[:password])
	      	render json: payload(user)
	    else
	      	render json: {errors: ['Invalid Username/Password']}, status: :unauthorized
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
	      clean_up_passwords user
	      set_minimum_password_length
	      render json: {errors: user.errors}, status: :unauthorized
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
