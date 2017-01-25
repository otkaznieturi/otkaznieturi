class UserController < ApplicationController
  before_action :authenticate_request!, except: [:activate]
  before_action :must_be_admin, only: [:users, :delete_users]

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

  def activate
    user = User.find_by(activation_token: params[:token])
    if user
      user.update_attributes!(activation_token: nil)
      render json: { status: :ok }
    else
      render json: { status: :not_found }, status: 404
    end
  end

  def delete_users
    User.where(id: [params[:ids]]).destroy_all
    users = User.where.not(id: @current_user.id)
    render json: { status: :ok, users: users }
  end

  def change_subscribe
    @current_user.update_attributes!(tours_subscribe: !@current_user.tours_subscribe)
    render json: { subscribe: @current_user.tours_subscribe }
  end

  private

  def user_params
    params.permit(:old_pass, :new_pass, :new_pass_confirm)
  end

  def must_be_admin
    return unless @current_user.admin
  end
end
