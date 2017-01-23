class ToursController < ApplicationController
  before_action :authenticate_request!, except: [:tours_counters]

  def tours_counters
    render json: { tours: Tour.count, today_tours: Tour.where("created_at >= ?", Time.zone.now.beginning_of_day).count }, status: :ok
  end

  def search
    found = Tour.where('country LIKE ?', "%#{params[:q]}%")
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
