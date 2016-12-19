require 'capistrano/setup'
require 'capistrano/deploy'

require "capistrano/bundler"
require 'capistrano/rvm'
require 'capistrano/rails/migrations'
require 'capistrano/rails/assets'
require 'capistrano/passenger'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
