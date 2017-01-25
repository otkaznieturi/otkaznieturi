class AccountActivationMailer < ApplicationMailer
  def sample_email(user)
    @user = user
    mail(to: user.email, subject: 'Активация аккаунта отказныетуры.рф')
  end
end
