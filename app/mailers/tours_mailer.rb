class ToursMailer < ApplicationMailer
  def sample_email(users, tour)
    @tour_info = tour
    users.each do |user|
      mail(to: user, subject: 'Sample Email')
    end
  end
end
