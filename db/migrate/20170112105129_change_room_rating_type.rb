class ChangeRoomRatingType < ActiveRecord::Migration[5.0]
  def change
    change_column :tours, :room_rating, :string
  end
end
