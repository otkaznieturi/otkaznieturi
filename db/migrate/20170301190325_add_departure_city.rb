class AddDepartureCity < ActiveRecord::Migration[5.0]
  def change
  	add_column :tours, :departure_city, :string
  end
end
