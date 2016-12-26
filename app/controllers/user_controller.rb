class UserController < ApplicationController
	before_action :authenticate_request!

	def change_pass
  		user = @current_user
  		if !user.valid_password?(user_params[:old_pass])
  			render json: {errors: ['Неверный пароль']}, status: 401
  		elsif user_params[:new_pass] != user_params[:new_pass_confirm]
  			render json: {errors: ['Пароль и подтверждение пароля не совпадают']}, status: 401
  		else
        user.update_attributes!(password: user_params[:new_pass])
  			render json: {info_msg: 'Пароль успешно изменен'}
  		end
	end

	private

  def user_params
		params.permit(:old_pass, :new_pass, :new_pass_confirm)
	end
end
