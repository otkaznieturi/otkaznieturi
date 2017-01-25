class AccountActivationMailer < ApplicationMailer
  def sample_email(user)
    @user = user
    mail(to: user.email, subject: 'Добавлен новый тур')
  end
end
