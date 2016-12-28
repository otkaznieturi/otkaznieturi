class AddReferenceToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :tours, :original_cost, :integer
    add_column :tours, :real_cost, :integer
    add_column :tours, :user_id, :integer
    add_index :tours, :user_id
  end
end
