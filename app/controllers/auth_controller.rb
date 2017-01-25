require 'digest/md5'
class AuthController < ApplicationController
  def authenticate_user
    user = User.find_for_database_authentication(email: params[:email])
    unless user
      return render json: {errors: ['Неверный email/пароль']}, status: :unauthorized
    end
    if user.activation_token
      return render json: {errors: ['Аккаунт не активирован. Ссылка для активации высылается на email при регистрации']}, status: :unauthorized
    end
    unless user.valid_password?(params[:password])
      return render json: {errors: ['Неверный email/пароль']}, status: :unauthorized
    end
    render json: payload(user)
  end

  def register_user
    user = User.new(user_params)
    user.activation_token = Digest::MD5.hexdigest(user_params[:email] + 'salt')
    user.save!
    if user.persisted? && user.active_for_authentication?
      AccountActivationMailer.sample_email(user).deliver!
      render json: payload(user)
    else
      render json: { errors: user.errors.messages.values }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end

  def payload(user)
    return nil unless user && user.id
    {
      auth_token: JsonWebToken.encode({ user_id: user.id }),
      user: {
        id: user.id,
        email: user.email,
        admin: user.admin,
        subscribe: user.tours_subscribe
      }
    }
  end
end
