class UserController < ApplicationController
  before_action :authenticate_request!
  before_action :must_be_admin, only: [:users]

  def change_pass
    user = @current_user
    if !user.valid_password?(user_params[:old_pass])
      render json: { errors: ['Неверный пароль'] }, status: 401
    elsif user_params[:new_pass] != user_params[:new_pass_confirm]
      render json: { errors: ['Пароль и подтверждение пароля не совпадают'] }, status: 401
    else
      user.update_attributes!(password: user_params[:new_pass])
      render json: { info_msg: 'Пароль успешно изменен' }
    end
  end

  def users
    users = User.where.not(id: @current_user.id)
    render json: { users: users }
  end

  private

  def user_params
    params.permit(:old_pass, :new_pass, :new_pass_confirm)
  end

  def must_be_admin
    return unless @current_user.admin
  end
end
