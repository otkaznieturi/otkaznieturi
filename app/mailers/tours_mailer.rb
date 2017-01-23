class ToursMailer < ApplicationMailer
  default from: "no-reply@отказныетуры.рф"
  def sample_email(user)
    # @user = user
    mail(to: user, subject: 'Sample Email')
  end
end
