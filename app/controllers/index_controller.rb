class IndexController < ApplicationController
	before_filter :authenticate_request!

	def index
		render json: {logged: true}
	end
end
