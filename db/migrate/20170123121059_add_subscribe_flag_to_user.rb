class AddSubscribeFlagToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :tours_subscribe, :boolean, default: false
  end
end
