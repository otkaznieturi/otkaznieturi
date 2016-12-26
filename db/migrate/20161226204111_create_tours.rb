class CreateTours < ActiveRecord::Migration[5.0]
  	def change
    	create_table :tours do |t|
    		t.string	:agency
			t.string	:country
			t.string	:city
			t.string	:hotel
			t.integer	:rating
			t.integer	:room_rating
			t.string	:dinner
			t.datetime	:departure_date
			t.integer	:nights
			t.integer	:adult_count
			t.integer	:child_count
			t.string	:child_ages
			t.text		:information
			t.string	:transfer
			t.integer	:current_cost
			t.string	:hotel_link
			t.string	:travel_agent
			t.string	:contacts
			t.string	:status
      		t.timestamps
    	end
  	end
end
