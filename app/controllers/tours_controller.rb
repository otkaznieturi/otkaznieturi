class ToursController < ApplicationController
  before_action :authenticate_request!

  def search
    found = Tour.where('country LIKE ?', "%#{params[:q]}%")
    render json: { tours: found }, status: :ok
  end

  def index
    render json: { tours: Tours.all }, status: :ok
  end

  def create
    tour = Tour.create(tour_params)
    if tour
      render json: { tour: tour }, status: 201
    else
      render json: { errors: tour.errors.messages.values }, status: :ok
    end
  end

  def my_tours
    render json: { tours: @current_user.tours }, status: :ok
  end

  def update
    tour = Tour.find_by(id: params[:id], client_id: @current_user)
    if tour
      tour.update_attributes(tour_params)
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
    tour = Tour.find_by(id: params[:id], client_id: @current_user)
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
      render json: { tour: tour }
    else
      render json: { errors: tour.errors.messages.values }, status: :ok
    end
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
