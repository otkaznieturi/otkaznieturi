class AddFieldsToUser < ActiveRecord::Migration[5.0]
  def change
  	add_column :users, :company_name, :string
  	add_column :users, :address, :string
  	add_column :users, :user_data, :text
  end
end
