class ToursController < ApplicationController
  before_action :authenticate_request!

  def search
    dfrom = Date.strptime(params[:departure_date_from], "%d.%m.%Y") if params[:departure_date_from]
    dto =  Date.strptime(params[:departure_date_to], "%d.%m.%Y") if params[:departure_date_to]
    nfrom = params[:nights_from] || 0
    nto = params[:nights_to] || 30
    cfrom = params[:real_cost_from] || 0
    cto = params[:real_cost_to] || 1000000
    found = Tour.where(
      nights: nfrom..nto,
      real_cost: cfrom..cto,
    )
    found = found.where(departure_date: dfrom..dto) if dfrom && dto
    found = found.where(tour_params)
    render json: { tours: found }, status: :ok
  end

  def index
    render json: { tours: Tour.all }, status: :ok
  end

  def today_tours
    render json: { tours: Tour.where("created_at >= ?", Time.zone.now.beginning_of_day) }, status: :ok
  end

  def create
    tour = Tour.create!(tour_params.merge(user: @current_user))
    if tour
      ToursController.deliver_notifications(tour)
      render json: { tour: tour }, status: 201
    else
      render json: { errors: tour.errors.messages.values }, status: :ok
    end
  end

  def my_tours
    render json: { tours: @current_user.tours }, status: :ok
  end

  def update
    tour = Tour.find_by(id: params[:id], user: @current_user)
    if tour
      result = tour.update_attributes!(tour_params)
      if result
        render json: { tour: :deleted }, status: 200
      else
        render json: { errors: result.errors.messages.values }, status: :ok
      end
    else
      return render json: { errors: ["Тур не найден"] }, status: :ok
    end
  end

  def destroy
    tour = Tour.find_by(id: params[:id], user: @current_user)
    if tour
      result = tour.destroy
      if result
        render json: { tour: :deleted }, status: 200
      else
        render json: { errors: result.errors.messages.values }, status: :ok
      end
    else
      return render json: { errors: ["Тур не найден"] }, status: :ok
    end
  end

  def show
    tour = Tour.find(params[:id])
    if tour
      render json: { tour: tour }, current_user: @current_user
    else
      render json: { errors: tour.errors.messages.values }, status: :ok
    end
  end

  def available_countries
    countries = Tour.pluck(:country).uniq
    render json: { countries: countries }
  end

  def self.deliver_notifications(tour)
    users = User.where(tours_subscribe: true).pluck(:email)
    ToursMailer.sample_email(users, tour).deliver!
  end

  private

  def tour_params
    allowed = [
      :agency,
      :country,
      :city,
      :hotel,
      :rating,
      :room_rating,
      :dinner,
      :departure_date,
      :departure_city,
      :nights,
      :adult_count,
      :child_count,
      :child_ages,
      :information,
      :transfer,
      :current_cost,
      :hotel_link,
      :travel_agent,
      :contacts,
      :status,
      :original_cost,
      :real_cost
    ]
    params.permit(allowed)
  end
end
