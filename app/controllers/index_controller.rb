class IndexController < ApplicationController
	def logged_user
		respond_with json: :ok, {status: user_signed_in?}
	end
end
