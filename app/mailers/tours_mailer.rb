class ToursMailer < ApplicationMailer
  def sample_email(users, tour)
    @tour_info = tour
    users.each do |user|
      mail(to: user, subject: 'Добавлен новый тур')
    end
  end
end
